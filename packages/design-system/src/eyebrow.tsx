import type { ComponentPropsWithoutRef } from 'react'

type EyebrowProps = ComponentPropsWithoutRef<'p'>

export function Eyebrow({ className = '', ...props }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300 ${className}`}
      {...props}
    />
  )
}
