import type { ComponentPropsWithoutRef } from 'react'

type TagProps = ComponentPropsWithoutRef<'span'>

export function Tag({ className = '', ...props }: TagProps) {
  return (
    <span
      className={`inline-flex rounded-full border border-slate-300 bg-white/70 px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 ${className}`}
      {...props}
    />
  )
}
