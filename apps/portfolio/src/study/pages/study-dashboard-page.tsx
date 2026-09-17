import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import { Link } from 'react-router-dom'
import { handbookCategories } from '../../content/handbook'
import { studyCards } from '../cards/study-cards'
import { Metric } from '../components/study-ui'
import {
  buttonPrimary,
  formatRelativeDate,
} from '../components/study-ui-helpers'
import { studyRatings, systemClock } from '../domain/study'
import {
  estimateStudySessionMinutes,
  limitStudySession,
} from '../queue/build-study-queue'
import { useStudy } from '../use-study'

export function StudyDashboardPage() {
  const { queue, storage, ready } = useStudy()
  const session = limitStudySession(queue, storage.settings)
  const reviewCount = session.filter((card) => !card.isNew).length
  const newCount = session.filter((card) => card.isNew).length
  const remaining = queue.slice(session.length)
  const remainingDue = remaining.filter((card) => !card.isNew).length
  const estimate = estimateStudySessionMinutes(session.length, storage.reviews)
  const categoryReviewCounts = handbookCategories.map((category) => ({
    category,
    count: storage.reviews.filter((review) => {
      const card = studyCards.find((item) => item.id === review.cardId)
      return card?.category === category
    }).length,
  }))
  const recent = [...storage.reviews].reverse().slice(0, 3)
  const now = systemClock.now()
  const upcoming = Object.values(storage.cards)
    .filter((progress) => Date.parse(progress.schedule.due) > now.getTime())
    .sort((left, right) => left.schedule.due.localeCompare(right.schedule.due))
    .slice(0, 3)

  return (
    <>
      <section className="border-b border-slate-200 py-16 sm:py-20 dark:border-slate-800">
        <Container>
          <Eyebrow>Adaptive study</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl dark:text-white">
            What should I review today?
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Attempt the answer first. FSRS schedules memory; interview evidence
            and interleaving shape today’s order.
          </p>
          <div className="mt-8">
            {ready && queue.length ? (
              <Link className={buttonPrimary} to="/study/review">
                Start review · {session.length}{' '}
                {session.length === 1 ? 'card' : 'cards'}
              </Link>
            ) : (
              <p
                aria-live="polite"
                className="font-semibold text-slate-700 dark:text-slate-200"
              >
                {ready
                  ? 'Nothing is due. Come back for the next scheduled review.'
                  : 'Loading local progress…'}
              </p>
            )}
            {ready && remaining.length ? (
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                {remaining.length} additional eligible{' '}
                {remaining.length === 1 ? 'card remains' : 'cards remain'} after
                this session
                {remainingDue
                  ? `, including ${remainingDue} due ${remainingDue === 1 ? 'card' : 'cards'}`
                  : ''}
                .
              </p>
            ) : null}
          </div>
        </Container>
      </section>
      <section className="py-12 sm:py-16">
        <Container>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Due in session" value={reviewCount} />
            <Metric label="New in session" value={newCount} />
            <Metric label="Reviews completed" value={storage.reviews.length} />
            <Metric label="Estimated session" value={`~${estimate} min`} />
          </dl>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <section aria-labelledby="due-heading">
              <h2
                className="text-2xl font-semibold text-slate-950 dark:text-white"
                id="due-heading"
              >
                This session
              </h2>
              <ul className="mt-5 space-y-3">
                {session.slice(0, 5).map((item) => (
                  <li
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                    key={item.definition.id}
                  >
                    <span className="font-semibold text-slate-950 dark:text-white">
                      {item.definition.tags[0]}
                    </span>
                    <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                      {item.isNew
                        ? 'New'
                        : formatRelativeDate(item.progress!.schedule.due)}
                    </span>
                  </li>
                ))}
                {!session.length ? (
                  <li className="text-slate-600 dark:text-slate-300">
                    No cards due.
                  </li>
                ) : null}
              </ul>
            </section>
            <section aria-labelledby="recent-heading">
              <h2
                className="text-2xl font-semibold text-slate-950 dark:text-white"
                id="recent-heading"
              >
                Recently studied
              </h2>
              <ul className="mt-5 space-y-3">
                {recent.map((review) => (
                  <li
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                    key={review.id}
                  >
                    <span className="font-semibold capitalize text-slate-950 dark:text-white">
                      {review.rating}
                    </span>
                    <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                      {studyCards.find((card) => card.id === review.cardId)
                        ?.tags[0] ?? 'Removed card'}
                    </span>
                  </li>
                ))}
                {!recent.length ? (
                  <li className="text-slate-600 dark:text-slate-300">
                    Your first reviews will appear here.
                  </li>
                ) : null}
              </ul>
            </section>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <section aria-labelledby="ratings-heading">
              <h2
                className="text-2xl font-semibold text-slate-950 dark:text-white"
                id="ratings-heading"
              >
                Recall ratings
              </h2>
              <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {studyRatings.map((rating) => (
                  <div
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                    key={rating}
                  >
                    <dt className="text-sm capitalize text-slate-600 dark:text-slate-400">
                      {rating}
                    </dt>
                    <dd className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                      {
                        storage.reviews.filter(
                          (review) => review.rating === rating,
                        ).length
                      }
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
            <section aria-labelledby="upcoming-heading">
              <h2
                className="text-2xl font-semibold text-slate-950 dark:text-white"
                id="upcoming-heading"
              >
                Upcoming reviews
              </h2>
              <ul className="mt-5 space-y-3">
                {upcoming.map((progress) => (
                  <li
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                    key={progress.cardId}
                  >
                    <span className="font-semibold text-slate-950 dark:text-white">
                      {studyCards.find((card) => card.id === progress.cardId)
                        ?.tags[0] ?? 'Removed card'}
                    </span>
                    <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                      {formatRelativeDate(progress.schedule.due, now)}
                    </span>
                  </li>
                ))}
                {!upcoming.length ? (
                  <li className="text-slate-600 dark:text-slate-300">
                    Upcoming workload appears after your first review.
                  </li>
                ) : null}
              </ul>
            </section>
          </div>
          <section
            aria-labelledby="category-distribution-heading"
            className="mt-12"
          >
            <h2
              className="text-2xl font-semibold text-slate-950 dark:text-white"
              id="category-distribution-heading"
            >
              Reviews by category
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Recall attempts grouped by the canonical handbook category.
            </p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {categoryReviewCounts.map(({ category, count }) => (
                <div
                  className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                  key={category}
                >
                  <dt className="text-sm text-slate-600 dark:text-slate-400">
                    {category}
                  </dt>
                  <dd className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                    {count}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </Container>
      </section>
    </>
  )
}
