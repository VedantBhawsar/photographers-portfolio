"use server";

import { headers } from "next/headers";

import { serviceOptions } from "@/content/services";

import { deliverConsultationRequest } from "./deliver";
import { checkRateLimit, rememberSubmission, wasRecentlySubmitted } from "./rate-limit";
import {
  HONEYPOT_FIELD,
  MIN_FILL_TIME_MS,
  STARTED_AT_FIELD,
  SUBMISSION_ID_FIELD,
  type ConsultationState,
} from "./state";
import { readConsultationValues, validateConsultation } from "./validation";

const allowedServices = serviceOptions.map((option) => option.value);
const SUBMISSION_ID_PATTERN = /^[a-zA-Z0-9-]{8,64}$/;

export async function requestConsultation(
  _previous: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  // Spam checks first. A filled honeypot or an instant submission is almost certainly a bot.
  const honeypot = formData.get(HONEYPOT_FIELD);
  const startedAt = Number(formData.get(STARTED_AT_FIELD));
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS;
  if ((typeof honeypot === "string" && honeypot.length > 0) || tooFast) {
    return {
      status: "error",
      message: "We couldn't send your request. Please wait a moment and try again.",
      values: readConsultationValues(formData),
    };
  }

  const result = validateConsultation(formData, allowedServices);
  if (!result.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: result.errors,
      values: result.values,
    };
  }

  const submissionIdRaw = formData.get(SUBMISSION_ID_FIELD);
  const submissionId =
    typeof submissionIdRaw === "string" && SUBMISSION_ID_PATTERN.test(submissionIdRaw) ? submissionIdRaw : null;

  // Already delivered (e.g. a double click that slipped through) — don't send it twice.
  if (submissionId && wasRecentlySubmitted(submissionId)) {
    return { status: "success" };
  }

  // Only deliverable requests count toward the limit, so fixing typos never locks a visitor out.
  const requestHeaders = await headers();
  const clientKey =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(clientKey).allowed) {
    return {
      status: "error",
      message: "You've sent several requests in a short time. Please wait a few minutes before trying again.",
      values: result.data,
    };
  }

  const serviceLabel =
    serviceOptions.find((option) => option.value === result.data.service)?.label ?? result.data.service;
  const delivery = await deliverConsultationRequest(result.data, { service: serviceLabel });

  if (!delivery.ok) {
    return {
      status: "error",
      message:
        delivery.reason === "not-configured"
          ? "Online requests aren't available just yet. Please contact us directly and we'll get back to you."
          : "Something went wrong while sending your request. Please try again in a moment.",
      values: result.data,
    };
  }

  if (submissionId) rememberSubmission(submissionId);
  return { status: "success" };
}
