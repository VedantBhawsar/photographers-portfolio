import "server-only";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import type { ConsultationValues } from "./validation";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

type Labels = { service: string };

/**
 * Delivers a validated consultation request.
 *
 * 1. Email via Resend when RESEND_API_KEY, CONSULTATION_TO_EMAIL and
 *    CONSULTATION_FROM_EMAIL are set.
 * 2. In development only, falls back to appending to `.data/consultation-requests.jsonl`
 *    so the flow can be exercised end to end without credentials.
 * 3. Otherwise reports "not-configured" — the visitor is never told a request
 *    was received when it was not.
 */
export async function deliverConsultationRequest(
  request: ConsultationValues,
  labels: Labels,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONSULTATION_TO_EMAIL;
  const from = process.env.CONSULTATION_FROM_EMAIL;

  if (apiKey && to && from) {
    return sendWithResend(request, labels, { apiKey, to, from });
  }

  if (process.env.NODE_ENV !== "production") {
    return storeLocally(request, labels);
  }

  console.error("[consultation] Delivery is not configured: set RESEND_API_KEY, CONSULTATION_TO_EMAIL and CONSULTATION_FROM_EMAIL.");
  return { ok: false, reason: "not-configured" };
}

async function sendWithResend(
  request: ConsultationValues,
  labels: Labels,
  config: { apiKey: string; to: string; from: string },
): Promise<DeliveryResult> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to.split(",").map((address) => address.trim()),
        reply_to: request.email,
        subject: `Consultation request — ${request.name}`,
        // Plain text only: visitor input is never interpreted as HTML.
        text: formatPlainText(request, labels),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // Status only — never log the payload, it contains personal data.
      console.error(`[consultation] Resend responded with HTTP ${response.status}.`);
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[consultation] Email delivery failed:", error instanceof Error ? error.name : "unknown error");
    return { ok: false, reason: "failed" };
  }
}

async function storeLocally(request: ConsultationValues, labels: Labels): Promise<DeliveryResult> {
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    const record = { receivedAt: new Date().toISOString(), ...request, serviceLabel: labels.service };
    await appendFile(path.join(dir, "consultation-requests.jsonl"), `${JSON.stringify(record)}\n`, "utf8");
    console.info("[consultation] Development mode: request stored in .data/consultation-requests.jsonl");
    return { ok: true };
  } catch (error) {
    console.error("[consultation] Could not store request locally:", error instanceof Error ? error.name : "unknown error");
    return { ok: false, reason: "failed" };
  }
}

function formatPlainText(request: ConsultationValues, labels: Labels): string {
  return [
    "New free consultation request",
    "",
    `Name: ${request.name}`,
    `Email: ${request.email}`,
    `Phone: ${request.phone || "—"}`,
    `Service: ${labels.service}`,
    `Preferred date / availability: ${request.availability}`,
    "",
    "Project description:",
    request.message,
    "",
    "Reply to this email to contact the client directly. No appointment has been booked yet.",
  ].join("\n");
}
