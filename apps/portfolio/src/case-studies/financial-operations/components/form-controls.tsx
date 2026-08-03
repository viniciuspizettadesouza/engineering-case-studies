import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'

const fieldClassName =
  'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white'

interface FieldProps {
  readonly id: string
  readonly label: string
  readonly error?: string
  readonly hint?: string
}

export function InputField({
  id,
  label,
  error,
  hint,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div>
      <label
        className="block font-medium text-slate-800 dark:text-slate-100"
        htmlFor={id}
      >
        {label}
      </label>
      {hint ? (
        <p
          className="mt-1 text-sm text-slate-500 dark:text-slate-400"
          id={`${id}-hint`}
        >
          {hint}
        </p>
      ) : null}
      <input
        {...props}
        aria-describedby={descriptionId}
        aria-invalid={Boolean(error)}
        className={fieldClassName}
        id={id}
      />
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  )
}

export function SelectField({
  id,
  label,
  error,
  children,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label
        className="block font-medium text-slate-800 dark:text-slate-100"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        {...props}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        className={fieldClassName}
        id={id}
      >
        {children}
      </select>
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  )
}

function FieldError({
  id,
  children,
}: {
  readonly id: string
  readonly children: ReactNode
}) {
  return (
    <p
      className="mt-2 text-sm font-medium text-red-700 dark:text-red-300"
      id={id}
    >
      {children}
    </p>
  )
}

interface ErrorSummaryProps {
  readonly errors: readonly {
    readonly field: string
    readonly message: string
  }[]
  readonly summaryRef: React.RefObject<HTMLDivElement | null>
}

export function ErrorSummary({ errors, summaryRef }: ErrorSummaryProps) {
  if (errors.length === 0) return null

  return (
    <div
      aria-labelledby="error-summary-title"
      className="rounded-xl border-2 border-red-600 bg-red-50 p-5 text-red-950 dark:bg-red-950/30 dark:text-red-100"
      ref={summaryRef}
      role="alert"
      tabIndex={-1}
    >
      <h2 className="font-semibold" id="error-summary-title">
        Check the information below
      </h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
        {errors.map(({ field, message }) => (
          <li key={field}>
            <a className="underline underline-offset-2" href={`#${field}`}>
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function StepIndicator({ current }: { readonly current: 1 | 2 }) {
  return (
    <p className="mt-8 font-mono text-sm font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">
      Step {current} of 2
    </p>
  )
}

export const primaryButtonClassName =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 font-semibold text-white outline-offset-4 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400'

export const secondaryLinkClassName =
  'inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 outline-offset-4 hover:border-slate-500 focus-visible:outline-2 focus-visible:outline-teal-600 dark:border-slate-700 dark:text-slate-200'
