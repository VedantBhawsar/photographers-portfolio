import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { sanitizeText, validateConsultation } from "./validation.ts";

const services = ["intimate-session", "signature-experience", "custom-project", "not-sure"];

const valid = {
  name: "Alex Example",
  email: "Alex@Example.com",
  phone: "",
  service: "signature-experience",
  availability: "Saturdays in June",
  message: "We're planning a small garden wedding for around forty guests.",
};

describe("validateConsultation", () => {
  it("accepts a complete request and normalises the email", () => {
    const result = validateConsultation(valid, services);
    assert.equal(result.success, true);
    if (result.success) assert.equal(result.data.email, "alex@example.com");
  });

  it("reads values from FormData", () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(valid)) formData.set(key, value);
    assert.equal(validateConsultation(formData, services).success, true);
  });

  it("reports every missing required field", () => {
    const result = validateConsultation({}, services);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.deepEqual(Object.keys(result.errors).sort(), ["availability", "email", "message", "name", "service"]);
      assert.equal(result.errors.phone, undefined, "phone is optional");
    }
  });

  it("rejects malformed email addresses", () => {
    for (const email of ["alex", "alex@", "alex@example", "a b@example.com", "alex@.com"]) {
      const result = validateConsultation({ ...valid, email }, services);
      assert.equal(result.success, false, email);
      if (!result.success) assert.ok(result.errors.email, email);
    }
  });

  it("validates the optional phone number only when provided", () => {
    assert.equal(validateConsultation({ ...valid, phone: "+44 (0)20 7946 0000" }, services).success, true);
    const result = validateConsultation({ ...valid, phone: "call me" }, services);
    assert.equal(result.success, false);
    if (!result.success) assert.ok(result.errors.phone);
  });

  it("only accepts known services", () => {
    const result = validateConsultation({ ...valid, service: "<script>" }, services);
    assert.equal(result.success, false);
    if (!result.success) assert.ok(result.errors.service);
  });

  it("enforces message length bounds", () => {
    const short = validateConsultation({ ...valid, message: "Hi there" }, services);
    assert.equal(short.success, false);
    const long = validateConsultation({ ...valid, message: "x".repeat(2001) }, services);
    assert.equal(long.success, false);
  });

  it("returns the sanitised values alongside errors so the form can be repopulated", () => {
    const result = validateConsultation({ ...valid, email: "nope", name: "  Alex  " }, services);
    assert.equal(result.success, false);
    if (!result.success) assert.equal(result.values.name, "Alex");
  });

  it("ignores non-string input", () => {
    const result = validateConsultation({ ...valid, name: { toString: () => "x" } as unknown as string }, services);
    assert.equal(result.success, false);
  });
});

describe("sanitizeText", () => {
  it("strips control characters and collapses line breaks in single-line fields", () => {
    assert.equal(sanitizeText("  Alex\r\nBcc: someone@example.com\u0000 "), "Alex Bcc: someone@example.com");
  });

  it("keeps paragraphs in multi-line fields but limits blank lines", () => {
    assert.equal(sanitizeText("One\r\n\r\n\r\n\r\nTwo", true), "One\n\nTwo");
  });
});
