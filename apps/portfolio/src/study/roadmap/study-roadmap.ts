import type { HandbookTopic } from '../../content/handbook'
import { handbookTopics } from '../../content/handbook'

export interface StudyRoadmapStageDefinition {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly topicSlugs: readonly string[]
}

export const studyRoadmapStages: readonly StudyRoadmapStageDefinition[] = [
  {
    id: 'frontend-foundations',
    title: 'Frontend Foundations',
    description:
      'Build a dependable base in the language, type system, layout, and accessibility of modern interfaces.',
    topicSlugs: ['javascript', 'typescript', 'css-and-ui'],
  },
  {
    id: 'frameworks-and-practice',
    title: 'Frameworks and Practice',
    description:
      'Apply the foundations through component models, framework trade-offs, debugging, and practical exercises.',
    topicSlugs: ['react', 'vue', 'technical-exercises'],
  },
  {
    id: 'systems-and-web',
    title: 'Systems and Web',
    description:
      'Connect frontend decisions to system boundaries, communication models, performance, and discoverability.',
    topicSlugs: [
      'architecture-and-patterns',
      'graphql-and-messaging',
      'web-performance-and-seo',
    ],
  },
  {
    id: 'quality-and-delivery',
    title: 'Quality and Delivery',
    description:
      'Strengthen testing, security, reliability, delivery practices, and the tools used to operate the work.',
    topicSlugs: ['testing-delivery-and-devops', 'developer-tooling'],
  },
  {
    id: 'career-growth',
    title: 'Career Growth',
    description:
      'Turn technical judgment into leadership, clearer evidence, and better interview and team decisions.',
    topicSlugs: ['technical-leadership', 'interview-strategy'],
  },
]

export function validateStudyRoadmap(
  stages: readonly StudyRoadmapStageDefinition[],
  topics: readonly HandbookTopic[] = handbookTopics,
) {
  const errors: string[] = []
  const knownSlugs = new Set(topics.map((topic) => topic.slug))
  const roadmapSlugs = stages.flatMap((stage) => [...stage.topicSlugs])
  const seenSlugs = new Set<string>()
  const seenStageIds = new Set<string>()

  for (const stage of stages) {
    if (!stage.id || seenStageIds.has(stage.id))
      errors.push(`Duplicate or empty roadmap stage id: ${stage.id}`)
    seenStageIds.add(stage.id)

    if (!stage.title.trim() || !stage.description.trim())
      errors.push(`Roadmap stage ${stage.id} has empty content`)
    if (stage.topicSlugs.length === 0)
      errors.push(`Roadmap stage ${stage.id} has no topics`)

    for (const slug of stage.topicSlugs) {
      if (!knownSlugs.has(slug))
        errors.push(`Roadmap has unknown handbook topic: ${slug}`)
      if (seenSlugs.has(slug))
        errors.push(`Roadmap repeats handbook topic: ${slug}`)
      seenSlugs.add(slug)
    }
  }

  for (const topic of topics) {
    if (!seenSlugs.has(topic.slug))
      errors.push(`Roadmap is missing handbook topic: ${topic.slug}`)
  }

  if (roadmapSlugs.length !== topics.length)
    errors.push(
      `Roadmap contains ${roadmapSlugs.length} topic entries for ${topics.length} handbook topics`,
    )

  return errors
}
