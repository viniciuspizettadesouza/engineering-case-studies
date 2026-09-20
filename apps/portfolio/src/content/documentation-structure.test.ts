import { describe, expect, it } from 'vitest'
import studyPlan from '../../../../docs/study-system-implementation-plan.md?raw'
import decision01 from '../../../../docs/decisions/0001-static-first-architecture.md?raw'
import decision02 from '../../../../docs/decisions/0002-incremental-monorepo.md?raw'
import decision03 from '../../../../docs/decisions/0003-static-financial-workflow.md?raw'
import decision04 from '../../../../docs/decisions/0004-static-vehicle-reservation.md?raw'
import decision05 from '../../../../docs/decisions/0005-configured-static-transit-ticketing.md?raw'
import decision06 from '../../../../docs/decisions/0006-tenant-scoped-catalogue-import.md?raw'
import decision07 from '../../../../docs/decisions/0007-explainable-retail-insights.md?raw'
import decision08 from '../../../../docs/decisions/0008-provisional-project-identity.md?raw'
import decision09 from '../../../../docs/decisions/0009-local-first-study-system.md?raw'
import financialStudy from '../../../../docs/case-studies/financial-operations-platform.md?raw'
import commerceStudy from '../../../../docs/case-studies/commerce-experience.md?raw'
import transitStudy from '../../../../docs/case-studies/accessible-transit-platform.md?raw'
import catalogueStudy from '../../../../docs/case-studies/modular-enterprise-workspace.md?raw'
import insightsStudy from '../../../../docs/case-studies/retail-insights-workspace.md?raw'
import financialReview from '../../../../docs/case-studies/financial-operations-platform-accessibility.md?raw'
import commerceReview from '../../../../docs/case-studies/commerce-experience-accessibility.md?raw'
import transitReview from '../../../../docs/case-studies/accessible-transit-platform-accessibility.md?raw'
import catalogueReview from '../../../../docs/case-studies/modular-enterprise-workspace-accessibility.md?raw'
import insightsReview from '../../../../docs/case-studies/retail-insights-workspace-accessibility.md?raw'

const decisions = [
  decision01,
  decision02,
  decision03,
  decision04,
  decision05,
  decision06,
  decision07,
  decision08,
  decision09,
]
const caseStudies = [
  financialStudy,
  commerceStudy,
  transitStudy,
  catalogueStudy,
  insightsStudy,
]
const accessibilityReviews = [
  financialReview,
  commerceReview,
  transitReview,
  catalogueReview,
  insightsReview,
]

function headings(markdown: string, depth: number) {
  const values: string[] = []
  let fence: '`' | '~' | undefined

  for (const line of markdown.split('\n')) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/)
    if (fenceMatch) {
      const marker = fenceMatch[1]?.charAt(0) as '`' | '~'
      fence = fence === marker ? undefined : (fence ?? marker)
      continue
    }
    if (fence) continue

    const match = line.match(new RegExp(`^#{${depth}} (.+)$`))
    if (match?.[1]) values.push(match[1])
  }

  return values
}

describe('documentation structure', () => {
  it('uses exactly one document title in every normalized file', () => {
    for (const markdown of [
      studyPlan,
      ...decisions,
      ...caseStudies,
      ...accessibilityReviews,
    ]) {
      expect(headings(markdown, 1)).toHaveLength(1)
    }
  })

  it('keeps the study implementation plan under one title', () => {
    expect(headings(studyPlan, 1)).toEqual([
      'Adaptive Study System Implementation Plan',
    ])

    const sections = headings(studyPlan, 2)
    expect(sections[0]).toBe('Implementation progress')
    expect(
      sections.slice(1).map((section) => Number.parseInt(section, 10)),
    ).toEqual(Array.from({ length: 65 }, (_, index) => index + 1))
  })

  it('uses the same core hierarchy in every architecture decision', () => {
    for (const decision of decisions) {
      expect(headings(decision, 2).slice(0, 5)).toEqual([
        'Status',
        'Context',
        'Decision',
        'Consequences',
        'Alternatives considered',
      ])
    }
  })

  it('uses one template for accessibility reviews', () => {
    for (const review of accessibilityReviews) {
      expect(headings(review, 2)).toEqual([
        'Scope and method',
        'Findings',
        'Remaining work and recommendations',
      ])
    }
  })

  it('keeps common case-study closing sections in the same order', () => {
    const closingSections = [
      'Implementation and architecture',
      'Validation evidence',
      'Security, privacy, and threat boundary',
      'Known limitations',
      'What I would do differently today',
      'Later increments',
    ]

    for (const study of caseStudies) {
      const sections = headings(study, 2)
      const positions = closingSections.map((section) =>
        sections.indexOf(section),
      )
      expect(positions.every((position) => position >= 0)).toBe(true)
      expect(positions).toEqual(
        [...positions].sort((left, right) => left - right),
      )
    }
  })
})
