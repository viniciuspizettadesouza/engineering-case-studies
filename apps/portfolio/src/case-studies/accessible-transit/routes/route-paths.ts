export const transitBasePath = '/case-studies/accessible-transit-platform'

export function transitTenantPath(tenantId: string): string {
  return `${transitBasePath}/tickets/${tenantId}`
}
