import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import { useRef, useState, type FormEvent } from 'react'
import { buttonPrimary, buttonSecondary } from '../components/study-ui-helpers'
import { validateStudySettings, type StudySettings } from '../domain/study'
import { parseStudyStorage } from '../storage/browser-study-progress-repository'
import { useStudy } from '../use-study'

export function StudySettingsPage() {
  const {
    storage,
    updateSettings,
    exportProgress,
    importProgress,
    resetProgress,
  } = useStudy()
  const [message, setMessage] = useState('')
  const importInput = useRef<HTMLInputElement>(null)

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const settings: StudySettings = {
      dailyNewCardLimit: Number(data.get('dailyNewCardLimit')),
      desiredRetention: Number(data.get('desiredRetention')) / 100,
      interleavingEnabled: data.get('interleavingEnabled') === 'on',
      sessionTargetMinutes: Number(data.get('sessionTargetMinutes')),
    }
    if (!validateStudySettings(settings)) {
      setMessage('Check each setting and try again.')
      return
    }
    await updateSettings(settings)
    setMessage('Study settings saved.')
  }

  async function downloadBackup() {
    const serialized = await exportProgress()
    const url = URL.createObjectURL(
      new Blob([serialized], { type: 'application/json' }),
    )
    const link = document.createElement('a')
    link.href = url
    link.download = `engineering-practice-lab-study-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    setMessage('Study progress exported.')
  }

  async function handleImport(file: File | undefined) {
    if (!file) return
    try {
      const serialized = await file.text()
      parseStudyStorage(serialized)
      if (
        !window.confirm(
          'Replace current study progress with this validated backup?',
        )
      )
        return
      await importProgress(serialized)
      setMessage('Study progress imported.')
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'The backup could not be imported.',
      )
    } finally {
      if (importInput.current) importInput.current.value = ''
    }
  }

  async function reset() {
    if (
      !window.confirm(
        'Reset all local study progress and review history? Export a backup first if needed.',
      )
    )
      return
    await resetProgress()
    setMessage('Local study progress reset.')
  }

  return (
    <Container>
      <section className="py-16 sm:py-20">
        <Eyebrow>Study settings</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl dark:text-white">
          Shape workload, not memory truth.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          FSRS continues to decide when cards are due. These controls limit new
          material, rotate topics, and set an intended session size.
        </p>
        <form
          className="mt-10 max-w-2xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          onSubmit={(event) => void save(event)}
        >
          <label className="block font-semibold text-slate-900 dark:text-white">
            New cards per session
            <input
              className="mt-2 block min-h-11 w-full rounded-lg border border-slate-400 bg-transparent px-3"
              defaultValue={storage.settings.dailyNewCardLimit}
              max="100"
              min="0"
              name="dailyNewCardLimit"
              type="number"
            />
          </label>
          <label className="block font-semibold text-slate-900 dark:text-white">
            Desired retention (%)
            <input
              className="mt-2 block min-h-11 w-full rounded-lg border border-slate-400 bg-transparent px-3"
              defaultValue={Math.round(storage.settings.desiredRetention * 100)}
              max="99"
              min="70"
              name="desiredRetention"
              type="number"
            />
          </label>
          <label className="block font-semibold text-slate-900 dark:text-white">
            Session target (minutes)
            <input
              className="mt-2 block min-h-11 w-full rounded-lg border border-slate-400 bg-transparent px-3"
              defaultValue={storage.settings.sessionTargetMinutes ?? 20}
              max="240"
              min="1"
              name="sessionTargetMinutes"
              type="number"
            />
          </label>
          <label className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white">
            <input
              defaultChecked={storage.settings.interleavingEnabled}
              name="interleavingEnabled"
              type="checkbox"
            />{' '}
            Interleave categories when alternatives exist
          </label>
          <button className={buttonPrimary} type="submit">
            Save settings
          </button>
        </form>
        <section aria-labelledby="backup-heading" className="mt-12 max-w-2xl">
          <h2
            className="text-2xl font-semibold text-slate-950 dark:text-white"
            id="backup-heading"
          >
            Backup and reset
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Progress stays in this browser. Export a JSON backup before clearing
            browser data or moving devices.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className={buttonSecondary}
              onClick={() => void downloadBackup()}
              type="button"
            >
              Export progress
            </button>
            <label className={`${buttonSecondary} cursor-pointer`}>
              Import progress
              <input
                accept="application/json,.json"
                className="sr-only"
                onChange={(event) => void handleImport(event.target.files?.[0])}
                ref={importInput}
                type="file"
              />
            </label>
            <button
              className="inline-flex min-h-11 items-center rounded-lg border border-red-600 px-5 py-2.5 font-semibold text-red-700 outline-offset-4 focus-visible:outline-2 dark:text-red-300"
              onClick={() => void reset()}
              type="button"
            >
              Reset progress
            </button>
          </div>
        </section>
        <p
          aria-live="polite"
          className="mt-6 font-semibold text-teal-700 dark:text-teal-300"
        >
          {message}
        </p>
      </section>
    </Container>
  )
}
