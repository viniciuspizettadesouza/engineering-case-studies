import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import { handbookCategories } from '../../content/handbook'
import { studyCards } from '../cards/study-cards'
import { StateLabel } from '../components/study-ui'
import { formatRelativeDate } from '../components/study-ui-helpers'
import { useStudy } from '../use-study'

export function KnowledgeMapPage() {
  const { storage } = useStudy()
  const now = new Date()
  return (
    <Container>
      <section className="py-16 sm:py-20">
        <Eyebrow>Knowledge map</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl dark:text-white">
          Visible memory, without a fake mastery score.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Memory state and due dates come from FSRS. Review count and lapses
          describe history; interview priority remains separate.
        </p>
        <div className="mt-12 space-y-12">
          {handbookCategories.map((category) => {
            const cards = studyCards.filter(
              (card) => card.category === category,
            )
            if (!cards.length) return null
            return (
              <section aria-labelledby={`map-${category}`} key={category}>
                <h2
                  className="text-2xl font-semibold text-slate-950 dark:text-white"
                  id={`map-${category}`}
                >
                  {category}
                </h2>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[42rem] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-300 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
                        <th className="p-3">Concept</th>
                        <th className="p-3">State</th>
                        <th className="p-3">Next review</th>
                        <th className="p-3">Reviews</th>
                        <th className="p-3">Lapses</th>
                        <th className="p-3">Stability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cards.map((card) => {
                        const progress = storage.cards[card.id]
                        return (
                          <tr
                            className="border-b border-slate-200 dark:border-slate-800"
                            key={card.id}
                          >
                            <th className="p-3 font-semibold text-slate-950 dark:text-white">
                              {card.tags[0]}
                              <span className="block text-xs font-normal text-slate-500">
                                {card.prompt}
                              </span>
                            </th>
                            <td className="p-3">
                              <StateLabel
                                state={progress?.schedule.state ?? 'new'}
                              />
                            </td>
                            <td className="p-3 text-sm text-slate-700 dark:text-slate-300">
                              {progress
                                ? formatRelativeDate(progress.schedule.due, now)
                                : 'Not scheduled'}
                            </td>
                            <td className="p-3">
                              {progress?.reviewCount ?? 0}
                            </td>
                            <td className="p-3">{progress?.lapseCount ?? 0}</td>
                            <td className="p-3">
                              {progress?.schedule.stability
                                ? `${progress.schedule.stability.toFixed(1)}d`
                                : '—'}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </Container>
  )
}
