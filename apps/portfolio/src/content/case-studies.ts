export type CaseStudyStatus = 'planned' | 'next'

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
    slug: 'operations-support-lab',
    sequence: '01',
    period: '2014—2017',
    title: 'Operations Support Lab',
    domain: 'IT operations',
    summary:
      'A triage workspace for prioritising incidents, tracking equipment and making support decisions visible.',
    narrative:
      'This study will explore the operational thinking that comes before product engineering: diagnosing incomplete information, communicating impact and restoring reliable service.',
    capabilities: ['Troubleshooting', 'Prioritisation', 'Reliability'],
    workflow: [
      'Receive an incident',
      'Assess impact',
      'Choose an action',
      'Record resolution',
    ],
    status: 'planned',
  },
  {
    slug: 'client-website-studio',
    sequence: '02',
    period: '2018—2019',
    title: 'Client Website Studio',
    domain: 'Digital delivery',
    summary:
      'A guided website brief that turns client goals into an accessible, responsive project outline.',
    narrative:
      'This study will focus on translating conversations into clear requirements while balancing usability, responsive behaviour and delivery constraints.',
    capabilities: ['Requirements', 'Responsive UI', 'Usability'],
    workflow: [
      'Capture goals',
      'Define audience',
      'Select priorities',
      'Generate a brief',
    ],
    status: 'planned',
  },
  {
    slug: 'financial-operations-platform',
    sequence: '03',
    period: '2019—2021',
    title: 'Financial Operations Platform',
    domain: 'Financial services',
    summary:
      'A fictional customer application and operations dashboard with role-aware workflows and audit events.',
    narrative:
      'This study will demonstrate full-stack product thinking without presenting real financial rules, customer data or previous system architecture.',
    capabilities: ['Typed APIs', 'Internationalisation', 'Auditability'],
    workflow: [
      'Submit a request',
      'Review eligibility',
      'Request information',
      'Record a decision',
    ],
    status: 'planned',
  },
  {
    slug: 'commerce-experience',
    sequence: '04',
    period: '2021—2022',
    title: 'Commerce Experience',
    domain: 'Digital commerce',
    summary:
      'A multilingual catalogue and checkout simulation designed around performance and measurable user intent.',
    narrative:
      'This study will examine the boundaries between product UI, content, payment orchestration and analytics while keeping every integration local and fictional.',
    capabilities: ['Performance', 'Checkout UX', 'Analytics boundaries'],
    workflow: [
      'Explore a catalogue',
      'Configure an item',
      'Review a basket',
      'Simulate payment',
    ],
    status: 'planned',
  },
  {
    slug: 'accessible-transit-platform',
    sequence: '05',
    period: '2022—2023',
    title: 'Accessible Transit Platform',
    domain: 'Public transport',
    summary:
      'A themeable subscription journey for fictional transport operators, built for keyboard and screen-reader users.',
    narrative:
      'This is the first planned executable study. It will use configuration and design tokens to serve distinct fictional tenants from one accessible product foundation.',
    capabilities: ['Accessibility', 'White-label UI', 'Design systems'],
    workflow: [
      'Choose a plan',
      'Enter passenger details',
      'Review',
      'Confirm subscription',
    ],
    status: 'next',
  },
  {
    slug: 'modular-enterprise-workspace',
    sequence: '06',
    period: '2023—Now',
    title: 'Modular Enterprise Workspace',
    domain: 'Enterprise platforms',
    summary:
      'A configurable workspace exploring modular delivery, permissions and human oversight of AI suggestions.',
    narrative:
      'This study will bring the career narrative together through shared contracts, tenant configuration, feature flags, developer experience and responsible automation.',
    capabilities: [
      'Modular architecture',
      'Developer experience',
      'Responsible AI',
    ],
    workflow: [
      'Configure a tenant',
      'Enable a module',
      'Review an AI suggestion',
      'Approve an action',
    ],
    status: 'planned',
  },
]

export function getCaseStudy(slug: string | undefined): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}
