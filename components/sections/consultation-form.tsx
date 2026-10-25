"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { requestConsultation } from "@/lib/consultation/actions";
import {
  HONEYPOT_FIELD,
  initialConsultationState,
  SELECT_SERVICE_EVENT,
  STARTED_AT_FIELD,
  SUBMISSION_ID_FIELD,
  type SelectServiceDetail,
} from "@/lib/consultation/state";
import {
  fieldLimits,
  MESSAGE_MIN_LENGTH,
  validateConsultation,
  type ConsultationField,
  type FieldErrors,
} from "@/lib/consultation/validation";
import { cn } from "@/lib/utils";

type ConsultationFormProps = {
  serviceOptions: { value: string; label: string }[];
  contactEmail: string | null;
  /** Service selected when the form first renders (e.g. on a service page). */
  defaultService?: string;
};

const controlClass =
  "block w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground transition-[border-color,box-shadow] placeholder:text-muted-foreground/80 focus:border-foreground focus:shadow-[inset_0_-1px_0_var(--foreground)] focus:outline-none aria-invalid:border-destructive aria-invalid:focus:shadow-[inset_0_-1px_0_var(--destructive)]";

export function ConsultationForm({ serviceOptions, contactEmail, defaultService }: ConsultationFormProps) {
  const [state, formAction, pending] = useActionState(requestConsultation, initialConsultationState);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const [edited, setEdited] = useState<ReadonlySet<ConsultationField>>(new Set());

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const submissionIdRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);

  const allowedServices = useMemo(() => serviceOptions.map((option) => option.value), [serviceOptions]);
  const serverErrors = state.status === "error" ? state.fieldErrors : undefined;
  const errors = clientErrors ?? serverErrors ?? {};
  const values = state.status === "error" ? state.values : undefined;

  // Spam heuristics + duplicate protection: stamp when the form became interactive
  // and give this form instance a unique id. Set on the DOM to avoid a hydration mismatch.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
    if (submissionIdRef.current) submissionIdRef.current.value = crypto.randomUUID();
  }, []);

  // "Discuss This Package" links preselect the matching service.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const { service } = (event as CustomEvent<SelectServiceDetail>).detail;
      if (serviceRef.current && allowedServices.includes(service)) {
        serviceRef.current.value = service;
        setEdited((previous) => new Set(previous).add("service"));
      }
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, [allowedServices]);

  // Move focus to the confirmation so screen reader and keyboard users land on it.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  // After a server-side validation failure, focus the first invalid field.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const first = Object.keys(state.fieldErrors)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="flex flex-col justify-center py-6" role="status">
        <p className="eyebrow text-muted-foreground">Request received</p>
        <h3 ref={successRef} tabIndex={-1} className="mt-4 text-title focus:outline-none">
          Thank you — your consultation request has been sent.
        </h3>
        <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
          Nothing has been booked yet. We&apos;ll read through your details and reply by email to suggest a time for
          your free consultation, based on the availability you shared.
        </p>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (pending) {
      event.preventDefault();
      return;
    }
    setEdited(new Set());
    const result = validateConsultation(new FormData(event.currentTarget), allowedServices);
    if (!result.success) {
      event.preventDefault();
      setClientErrors(result.errors);
      const first = Object.keys(result.errors)[0];
      if (first) event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setClientErrors(null);
  };

  const markEdited = (field: ConsultationField) => {
    if (!edited.has(field)) setEdited((previous) => new Set(previous).add(field));
  };

  const errorFor = (field: ConsultationField) => (edited.has(field) ? undefined : errors[field]);
  const hasVisibleErrors = Object.keys(errors).some((field) => !edited.has(field as ConsultationField));
  // Field problems get a short summary; other failures (spam check, rate limit, delivery) show the server message.
  const generalMessage = hasVisibleErrors
    ? "Please check the highlighted fields."
    : state.status === "error" && !clientErrors && !serverErrors
      ? state.message
      : null;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={pending}
      aria-describedby="consultation-form-note"
      className="grid gap-x-8 gap-y-9 sm:grid-cols-2"
    >
      <Field id="name" label="Name" required error={errorFor("name")}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={fieldLimits.name}
          defaultValue={values?.name}
          aria-invalid={Boolean(errorFor("name"))}
          aria-describedby={errorFor("name") ? "name-error" : undefined}
          onChange={() => markEdited("name")}
          className={controlClass}
        />
      </Field>

      <Field id="email" label="Email" required error={errorFor("email")}>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={fieldLimits.email}
          defaultValue={values?.email}
          aria-invalid={Boolean(errorFor("email"))}
          aria-describedby={errorFor("email") ? "email-error" : undefined}
          onChange={() => markEdited("email")}
          className={controlClass}
        />
      </Field>

      <Field id="phone" label="Phone" hint="Optional" error={errorFor("phone")}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={fieldLimits.phone}
          defaultValue={values?.phone}
          aria-invalid={Boolean(errorFor("phone"))}
          aria-describedby={errorFor("phone") ? "phone-error" : undefined}
          onChange={() => markEdited("phone")}
          className={controlClass}
        />
      </Field>

      <Field id="service" label="Photography service" required error={errorFor("service")}>
        <div className="relative">
          <select
            ref={serviceRef}
            id="service"
            name="service"
            required
            defaultValue={values?.service ?? defaultService ?? ""}
            aria-invalid={Boolean(errorFor("service"))}
            aria-describedby={errorFor("service") ? "service-error" : undefined}
            onChange={() => markEdited("service")}
            className={cn(controlClass, "cursor-pointer appearance-none pr-8")}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2"
          >
            <path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        </div>
      </Field>

      <Field
        id="availability"
        label="Preferred date or availability"
        required
        hint="A date, a season, or a few times that suit you for a call"
        error={errorFor("availability")}
        className="sm:col-span-2"
      >
        <input
          id="availability"
          name="availability"
          type="text"
          required
          maxLength={fieldLimits.availability}
          defaultValue={values?.availability}
          aria-invalid={Boolean(errorFor("availability"))}
          aria-describedby={errorFor("availability") ? "availability-hint availability-error" : "availability-hint"}
          onChange={() => markEdited("availability")}
          className={controlClass}
        />
      </Field>

      <Field
        id="message"
        label="Tell us about your project"
        required
        hint="The occasion, the people involved, the feeling you'd like to capture — a few sentences is perfect"
        error={errorFor("message")}
        className="sm:col-span-2"
      >
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={MESSAGE_MIN_LENGTH}
          maxLength={fieldLimits.message}
          defaultValue={values?.message}
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={errorFor("message") ? "message-hint message-error" : "message-hint"}
          onChange={() => markEdited("message")}
          className={cn(controlClass, "resize-y")}
        />
      </Field>

      {/* Spam trap: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name={STARTED_AT_FIELD} />
      <input ref={submissionIdRef} type="hidden" name={SUBMISSION_ID_FIELD} />

      <div className="sm:col-span-2">
        <div aria-live="assertive" role="alert">
          {generalMessage && (
            <p className="mb-6 border-l-2 border-destructive pl-4 text-sm leading-relaxed text-destructive">
              {generalMessage}
              {!hasVisibleErrors && contactEmail && (
                <>
                  {" "}
                  You can also email{" "}
                  <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
                    {contactEmail}
                  </a>
                  .
                </>
              )}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" disabled={pending} focusableWhenDisabled className="w-full sm:w-auto">
            {pending ? "Sending…" : "Request Free Consultation"}
          </Button>
          <p id="consultation-form-note" className="text-xs leading-relaxed text-muted-foreground sm:max-w-56 sm:text-right">
            Free and without obligation. Fields marked <span aria-hidden="true">*</span>
            <span className="sr-only">with an asterisk</span> are required.
          </p>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          We only use these details to reply to your enquiry. See our{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  id: ConsultationField;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow block text-muted-foreground">
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {!required && hint && <span className="ml-2 tracking-normal normal-case">({hint})</span>}
      </label>
      {children}
      {required && hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
