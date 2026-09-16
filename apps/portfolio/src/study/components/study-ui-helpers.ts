export const buttonPrimary =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 font-semibold text-white outline-offset-4 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-50'
export const buttonSecondary =
  'inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-400 px-5 py-2.5 font-semibold text-slate-800 outline-offset-4 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-slate-100'

export function formatRelativeDate(value: string, now = new Date()) {
  const difference = Date.parse(value) - now.getTime()
  const minutes = Math.max(1, Math.round(Math.abs(difference) / 60_000))
  if (difference <= 0)
    return minutes < 60 ? 'due now' : `${Math.ceil(minutes / 1440)}d overdue`
  if (minutes < 60) return `in ${minutes}m`
  if (minutes < 1440) return `in ${Math.round(minutes / 60)}h`
  return `in ${Math.round(minutes / 1440)}d`
}
