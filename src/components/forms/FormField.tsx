import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cx } from "@/lib/cx";

/**
 * Accessible form field primitives. `Field` owns the label, hint and error and wires them to
 * the control through ids, so every control has a programmatic label, its hint is announced,
 * and an error sets aria-invalid and is read out with the field.
 *
 * Usage:
 *   <Field id="email" label="Email" required error={errors.email}>
 *     {(control) => <Input type="email" autoComplete="email" {...control} />}
 *   </Field>
 */

export interface ControlProps {
  readonly id: string;
  readonly name: string;
  readonly required?: boolean;
  readonly "aria-invalid"?: true;
  readonly "aria-describedby"?: string;
}

interface FieldProps {
  readonly id: string;
  readonly label: string;
  readonly name?: string;
  readonly hint?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly className?: string;
  readonly children: (control: ControlProps) => ReactNode;
}

export function Field({
  id,
  label,
  name = id,
  hint,
  error,
  required = false,
  className,
  children,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {children({
        id,
        name,
        required,
        ...(error ? { "aria-invalid": true as const } : {}),
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
      })}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/*
 * Focus uses the global 3px teal outline (meets the 3:1 focus-indicator contrast);
 * the border colour change is a secondary cue only.
 */
const controlBase =
  "w-full rounded-input border border-line-strong bg-white px-3.5 text-base text-ink " +
  "placeholder:text-muted transition-colors duration-(--duration-fast) " +
  "hover:border-teal-500 focus:border-teal-600 aria-invalid:border-2 aria-invalid:border-danger " +
  "disabled:cursor-not-allowed disabled:bg-surface";

/* 16px text prevents iOS Safari from zooming into focused fields. */
export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(controlBase, "min-h-12", className)} {...rest} />;
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(controlBase, "min-h-36 py-3", className)} {...rest} />;
}

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cx(controlBase, "min-h-12 appearance-auto pr-3", className)} {...rest}>
      {children}
    </select>
  );
}
