import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'

const fieldClassName =
  'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 shadow-sm outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white'

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
  const descriptionIds = [hint ? `${id}-hint` : '', error ? `${id}-error` : '']
    .filter(Boolean)
    .join(' ')

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
        aria-describedby={descriptionIds || undefined}
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

export function ErrorSummary({
  errors,
  summaryRef,
}: {
  readonly errors: readonly {
    readonly field: string
    readonly message: string
  }[]
  readonly summaryRef: React.RefObject<HTMLDivElement | null>
}) {
  if (errors.length === 0) return null

  return (
    <div
      aria-labelledby="reservation-error-title"
      className="rounded-xl border-2 border-red-600 bg-red-50 p-5 text-red-950 dark:bg-red-950/30 dark:text-red-100"
      ref={summaryRef}
      role="alert"
      tabIndex={-1}
    >
      <h2 className="font-semibold" id="reservation-error-title">
        Check the reservation details
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
