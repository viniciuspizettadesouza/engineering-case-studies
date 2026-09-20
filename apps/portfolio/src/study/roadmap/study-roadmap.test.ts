import { describe, expect, it } from 'vitest'
import { handbookTopics } from '../../content/handbook'
import { studyRoadmapStages, validateStudyRoadmap } from './study-roadmap'

describe('study roadmap', () => {
  it('orders every handbook topic exactly once across five stages', () => {
    expect(studyRoadmapStages.map((stage) => stage.id)).toEqual([
      'frontend-foundations',
      'frameworks-and-practice',
      'systems-and-web',
      'quality-and-delivery',
      'career-growth',
    ])
    expect(
      studyRoadmapStages.flatMap((stage) => stage.topicSlugs),
    ).toHaveLength(handbookTopics.length)
    expect(validateStudyRoadmap(studyRoadmapStages)).toEqual([])
  })

  it('reports unknown, repeated, and missing topics', () => {
    const invalid = [
      {
        id: 'invalid',
        title: 'Invalid',
        description: 'Invalid roadmap fixture.',
        topicSlugs: ['javascript', 'javascript', 'missing'],
      },
    ]

    expect(validateStudyRoadmap(invalid)).toEqual(
      expect.arrayContaining([
        expect.stringContaining('repeats handbook topic: javascript'),
        expect.stringContaining('unknown handbook topic: missing'),
        expect.stringContaining('missing handbook topic: typescript'),
      ]),
    )
  })
})
