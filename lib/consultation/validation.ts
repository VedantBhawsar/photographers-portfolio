/**
 * Consultation request validation, shared by the client form and the server action.
 * Kept free of framework imports so it can run anywhere (and in `node --test`).
 */

export const consultationFields = [
  "name",
  "email",
  "phone",
  "service",
  "availability",
  "message",
] as const;

export type ConsultationField = (typeof consultationFields)[number];

export type ConsultationValues = Record<ConsultationField, string>;

export type FieldErrors = Partial<Record<ConsultationField, string>>;

export type ValidationResult =
  | { success: true; data: ConsultationValues }
  | { success: false; errors: FieldErrors; values: ConsultationValues };

export const fieldLimits = {
  name: 100,
  email: 254,
  phone: 30,
  service: 64,
  availability: 200,
  message: 2000,
} as const satisfies Record<ConsultationField, number>;

export const MESSAGE_MIN_LENGTH = 20;

/** Pragmatic address check — the real verification is replying to it. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{7,}$/;
// Control characters other than tab / newline / carriage return.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Trim, drop control characters and (for single-line fields) collapse line breaks. */
export function sanitizeText(value: unknown, multiline = false): string {
  if (typeof value !== "string") return "";
  const cleaned = value.replace(CONTROL_CHARS, "");
  const normalised = multiline
    ? cleaned.replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n")
    : cleaned.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ");
  return normalised.trim();
}

export function readConsultationValues(
  source: FormData | Partial<Record<string, unknown>>,
): ConsultationValues {
  const get = (key: ConsultationField) =>
    source instanceof FormData ? source.get(key) : source[key];

  return {
    name: sanitizeText(get("name")),
    email: sanitizeText(get("email")).toLowerCase(),
    phone: sanitizeText(get("phone")),
    service: sanitizeText(get("service")),
    availability: sanitizeText(get("availability")),
    message: sanitizeText(get("message"), true),
  };
}

export function validateConsultation(
  source: FormData | Partial<Record<string, unknown>>,
  allowedServices: readonly string[],
): ValidationResult {
  const values = readConsultationValues(source);
  const errors: FieldErrors = {};

  if (!values.name) {
    errors.name = "Please tell us your name.";
  } else if (values.name.length > fieldLimits.name) {
    errors.name = `Please keep your name under ${fieldLimits.name} characters.`;
  }

  if (!values.email) {
    errors.email = "Please enter your email address so we can reply.";
  } else if (values.email.length > fieldLimits.email || !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }

  if (values.phone) {
    if (values.phone.length > fieldLimits.phone || !PHONE_PATTERN.test(values.phone)) {
      errors.phone = "Please enter a valid phone number, or leave this blank.";
    }
  }

  if (!values.service) {
    errors.service = "Please choose the kind of photography you're interested in.";
  } else if (!allowedServices.includes(values.service)) {
    errors.service = "Please choose one of the listed options.";
  }

  if (!values.availability) {
    errors.availability = "Please share a date, season or a few times that suit you.";
  } else if (values.availability.length > fieldLimits.availability) {
    errors.availability = `Please keep this under ${fieldLimits.availability} characters.`;
  }

  if (values.message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Please tell us a little about your project (at least ${MESSAGE_MIN_LENGTH} characters).`;
  } else if (values.message.length > fieldLimits.message) {
    errors.message = `Please keep your description under ${fieldLimits.message} characters.`;
  }

  return Object.keys(errors).length > 0
    ? { success: false, errors, values }
    : { success: true, data: values };
}
