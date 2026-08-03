export type CaseStudyStatus = 'planned' | 'next' | 'in-progress' | 'complete'

export interface CaseStudy {
  readonly slug: string
  readonly sequence: string
  readonly period: string
  readonly title: string
  readonly domain: string
  readonly summary: string
  readonly narrative: string
  readonly capabilities: readonly string[]
  readonly workflow: readonly string[]
  readonly status: CaseStudyStatus
}

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'financial-operations-platform',
    sequence: '01',
    period: '2019—2021',
    title: 'Financial Operations Platform',
    domain: 'Financial services',
    summary:
      'A two-step credit application and a separate verification dashboard for fictional applicants and operations agents.',
    narrative:
      'This study will demonstrate form modelling, role-aware review and auditable state transitions without using real financial rules, customer data or company architecture.',
    capabilities: ['Accessible forms', 'Role-aware review', 'Auditability'],
    workflow: [
      'Complete application step one',
      'Complete application step two',
      'Submit for verification',
      'Review in the agent dashboard',
    ],
    status: 'complete',
  },
  {
    slug: 'commerce-experience',
    sequence: '02',
    period: '2021—2022',
    title: 'Commerce Experience',
    domain: 'Digital commerce',
    summary:
      'A fictional vehicle marketplace where a buyer selects a vehicle and completes a reservation request.',
    narrative:
      'This study examines vehicle discovery, reservation UX, content, analytics boundaries and performance while keeping every integration local and fictional.',
    capabilities: ['Performance', 'Reservation UX', 'Analytics boundaries'],
    workflow: [
      'Search fictional vehicles',
      'Choose a vehicle',
      'Complete reservation details',
      'Review and submit the request',
    ],
    status: 'complete',
  },
  {
    slug: 'accessible-transit-platform',
    sequence: '03',
    period: '2022—2023',
    title: 'Accessible Transit Platform',
    domain: 'Public transport',
    summary:
      'A themeable ticket-purchase journey for fictional transport operators, built for keyboard and screen-reader users.',
    narrative:
      'This study uses configuration and design tokens to serve distinct fictional tenants through one accessible ticketing foundation.',
    capabilities: ['Accessibility', 'White-label UI', 'Design systems'],
    workflow: [
      'Plan a fictional journey',
      'Choose a fare',
      'Enter passenger details',
      'Review and confirm the ticket',
    ],
    status: 'complete',
  },
  {
    slug: 'modular-enterprise-workspace',
    sequence: '04',
    period: '2023—Now',
    title: 'Modular Enterprise Workspace',
    domain: 'Enterprise platforms',
    summary:
      'A shadcn-based workspace for bulk product registration across two fictional retail tenants.',
    narrative:
      'This study will explore bulk product onboarding, tenant-specific validation and reusable enterprise UI without reproducing any real retailer data or internal workflow.',
    capabilities: [
      'Modular architecture',
      'Multi-tenancy',
      'Bulk data workflows',
    ],
    workflow: [
      'Choose a fictional tenant',
      'Upload or paste products',
      'Validate and correct rows',
      'Publish the accepted batch',
    ],
    status: 'next',
  },
  {
    slug: 'retail-insights-workspace',
    sequence: '05',
    period: '2023—Now',
    title: 'Retail Insights Workspace',
    domain: 'Retail analytics',
    summary:
      'A data-visualisation workspace where fictional store managers review daily sales insights generated from simulated retail data.',
    narrative:
      'This study will explore trustworthy AI-assisted analytics, explainable insights and accessible data visualisation without using real retailer data, models or internal metrics.',
    capabilities: [
      'Data visualisation',
      'AI-assisted insights',
      'Responsible AI',
    ],
    workflow: [
      'Choose a fictional store and date',
      'Review the sales overview',
      'Inspect a generated insight',
      'Explore its supporting visualisation',
    ],
    status: 'planned',
  },
]

export function getCaseStudy(slug: string | undefined): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}
