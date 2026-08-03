export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function formatApplicationStatus(
  status: 'awaiting_verification' | 'verified' | 'needs_information',
): string {
  const labels = {
    awaiting_verification: 'Awaiting verification',
    verified: 'Verified',
    needs_information: 'Needs information',
  } as const

  return labels[status]
}
