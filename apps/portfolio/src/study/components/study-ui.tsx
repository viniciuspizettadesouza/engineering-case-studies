import type { ReactNode } from 'react'
import type { MemoryState } from '../domain/study'

export function Metric({
  label,
  value,
}: {
  readonly label: string
  readonly value: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <dt className="text-sm text-slate-600 dark:text-slate-400">{label}</dt>
      <dd className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
        {value}
      </dd>
    </div>
  )
}

export function StateLabel({ state }: { readonly state: MemoryState }) {
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-700 dark:bg-slate-800 dark:text-slate-200">
      {state}
    </span>
  )
}
