import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import { getStudyCard } from '../cards/study-cards'
import { StateLabel } from '../components/study-ui'
import { formatRelativeDate } from '../components/study-ui-helpers'
import { useStudy } from '../use-study'

export function StudyHistoryPage() {
  const { storage } = useStudy()
  const reviews = [...storage.reviews].sort((left, right) =>
    right.reviewedAt.localeCompare(left.reviewedAt),
  )
  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  return (
    <Container>
      <section className="py-16 sm:py-20">
        <Eyebrow>Review history</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl dark:text-white">
          Every recall attempt, in order.
        </h1>
        <div className="mt-12">
          <ol className="space-y-4">
            {reviews.map((review) => {
              const card = getStudyCard(review.cardId)
              return (
                <li
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                  key={review.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">
                        {card?.prompt ?? `Removed card · ${review.cardId}`}
                      </p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        {formatter.format(new Date(review.reviewedAt))} ·{' '}
                        <span className="capitalize">{review.rating}</span> ·
                        Next review {formatRelativeDate(review.dueAfter)}
                      </p>
                    </div>
                    <StateLabel state={review.stateAfter} />
                  </div>
                </li>
              )
            })}
          </ol>
          {!reviews.length ? (
            <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-slate-600 dark:border-slate-700 dark:text-slate-300">
              No reviews yet. Complete a study card and its history will appear
              here.
            </p>
          ) : null}
        </div>
      </section>
    </Container>
  )
}
