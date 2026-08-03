import { describe, expect, it } from 'vitest'
import { caseStudies, getCaseStudy } from './case-studies'

describe('case-study catalogue', () => {
  it('keeps a unique chronological sequence and one next study', () => {
    expect(new Set(caseStudies.map(({ slug }) => slug)).size).toBe(
      caseStudies.length,
    )
    expect(caseStudies.map(({ sequence }) => sequence)).toEqual([
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
    ])
    expect(caseStudies.filter(({ status }) => status === 'next')).toHaveLength(
      1,
    )
  })

  it('retrieves studies by slug', () => {
    expect(getCaseStudy('accessible-transit-platform')?.status).toBe('next')
    expect(getCaseStudy('not-real')).toBeUndefined()
  })
})
