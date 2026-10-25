import type { ConsultationValues, FieldErrors } from "./validation";

export type ConsultationState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: FieldErrors;
      /** Echoed back so the form keeps what the visitor typed. */
      values?: Partial<ConsultationValues>;
    };

export const initialConsultationState: ConsultationState = { status: "idle" };

/** Hidden spam-trap field. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = "company_website";
export const STARTED_AT_FIELD = "form_started_at";
export const SUBMISSION_ID_FIELD = "submission_id";

/** Anything submitted faster than this after the form appeared is treated as automated. */
export const MIN_FILL_TIME_MS = 3_000;

/** Dispatched on window by "Discuss This Package" links to preselect a service in the form. */
export const SELECT_SERVICE_EVENT = "consultation:select-service";
export type SelectServiceDetail = { service: string };
