import {
  Container,
  Eyebrow,
  Tag,
} from '@engineering-case-studies/design-system'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  buttonPrimary,
  buttonSecondary,
  formatRelativeDate,
} from '../components/study-ui-helpers'
import { systemClock, type StudyRating } from '../domain/study'
import { FsrsStudyScheduler } from '../scheduler/fsrs-scheduler'
import { useStudy } from '../use-study'

const ratingLabels: readonly [StudyRating, string][] = [
  ['again', 'Again'],
  ['hard', 'Hard'],
  ['good', 'Good'],
  ['easy', 'Easy'],
]

export function StudyReviewPage() {
  const { queue, review, storage, ready } = useStudy()
  const [sessionIds] = useState(() => {
    const sessionLimit = Math.max(
      1,
      Math.floor((storage.settings.sessionTargetMinutes ?? 20) / 1.5),
    )
    return queue.slice(0, sessionLimit).map((card) => card.definition.id)
  })
  const [position, setPosition] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [saving, setSaving] = useState(false)
  const [now, setNow] = useState(() => systemClock.now())
  const item = queue.find((card) => card.definition.id === sessionIds[position])
  const scheduler = useMemo(
    () => new FsrsStudyScheduler(storage.settings.desiredRetention),
    [storage.settings.desiredRetention],
  )
  const schedule =
    item?.progress?.schedule ?? (item ? scheduler.createCard(now) : undefined)
  const preview = schedule ? scheduler.preview(schedule, now) : undefined

  async function rate(rating: StudyRating) {
    if (!item || saving) return
    setSaving(true)
    await review(item.definition.id, rating)
    setPosition((value) => value + 1)
    setRevealed(false)
    setSaving(false)
    setNow(systemClock.now())
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, select, button, a')) return
      if (!revealed && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault()
        setRevealed(true)
      } else if (revealed && ['1', '2', '3', '4'].includes(event.key)) {
        const rating = ratingLabels[Number(event.key) - 1]?.[0]
        if (rating && item && !saving) {
          setSaving(true)
          void review(item.definition.id, rating).then(() => {
            setPosition((value) => value + 1)
            setRevealed(false)
            setSaving(false)
            setNow(systemClock.now())
          })
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [item, revealed, review, saving])

  if (!ready)
    return (
      <Container>
        <p aria-live="polite" className="py-16">
          Loading study session…
        </p>
      </Container>
    )
  if (!item)
    return (
      <Container>
        <section className="py-20">
          <Eyebrow>Session complete</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold text-slate-950 dark:text-white">
            You reviewed {position} {position === 1 ? 'card' : 'cards'}.
          </h1>
          <p className="mt-5 text-slate-600 dark:text-slate-300">
            FSRS has scheduled the next review for each answer.
          </p>
          <Link className={`${buttonPrimary} mt-8`} to="/study">
            Back to today
          </Link>
        </section>
      </Container>
    )

  const source = `/handbook/${item.definition.topicSlug}${item.definition.headingId ? `#${item.definition.headingId}` : ''}`
  return (
    <Container>
      <section className="mx-auto max-w-3xl py-12 sm:py-20">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Card {position + 1} of {sessionIds.length}
        </p>
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap gap-2">
            <Tag>{item.definition.category}</Tag>
            <Tag>{item.definition.tags[0]}</Tag>
          </div>
          {item.definition.interviewEvidence === 'asked' ? (
            <p className="mt-5 text-sm font-semibold text-teal-700 dark:text-teal-300">
              Asked in a real interview
            </p>
          ) : null}
          <h1 className="mt-5 text-2xl font-semibold leading-tight text-slate-950 sm:text-4xl dark:text-white">
            {item.definition.prompt}
          </h1>
          {!revealed ? (
            <button
              autoFocus
              className={`${buttonPrimary} mt-10 w-full sm:w-auto`}
              onClick={() => setRevealed(true)}
              type="button"
            >
              Show answer
            </button>
          ) : (
            <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-700">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Answer
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
                {item.definition.answer}
              </p>
              <Link
                className="mt-5 inline-flex rounded-sm font-semibold text-teal-700 outline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-teal-300"
                to={source}
              >
                Read full explanation →
              </Link>
              <fieldset className="mt-10">
                <legend className="font-semibold text-slate-950 dark:text-white">
                  How well did you recall it?
                </legend>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {ratingLabels.map(([rating, label], index) => (
                    <button
                      aria-label={`${label}, next review ${formatRelativeDate(preview![rating].due, now)}`}
                      className={buttonSecondary}
                      disabled={saving}
                      key={rating}
                      onClick={() => void rate(rating)}
                      type="button"
                    >
                      <span>
                        <span className="block">
                          {index + 1} · {label}
                        </span>
                        <span className="block text-xs font-normal">
                          {formatRelativeDate(preview![rating].due, now)}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          )}
        </div>
        <p aria-live="polite" className="sr-only">
          {revealed
            ? 'Answer revealed. Rating controls are now available.'
            : 'Question shown. Think before revealing the answer.'}
        </p>
      </section>
    </Container>
  )
}
