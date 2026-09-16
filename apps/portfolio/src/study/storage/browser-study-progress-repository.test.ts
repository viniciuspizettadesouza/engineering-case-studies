import { describe, expect, it } from 'vitest'
import { createEmptyStudyStorage } from '../domain/study'
import {
  BrowserStudyProgressRepository,
  STUDY_STORAGE_KEY,
  parseStudyStorage,
} from './browser-study-progress-repository'

describe('browser study progress repository', () => {
  it('round trips export/import and includes an export date', async () => {
    localStorage.clear()
    const repository = new BrowserStudyProgressRepository(localStorage)
    await repository.save(createEmptyStudyStorage())
    const exported = await repository.export()
    const parsed = JSON.parse(exported) as unknown
    expect((parsed as { exportedAt: unknown }).exportedAt).toBeTypeOf('string')
    await repository.clear()
    await repository.import(exported)
    expect(await repository.load()).toEqual(createEmptyStudyStorage())
  })

  it('recovers from malformed local data without destroying it', async () => {
    localStorage.setItem(STUDY_STORAGE_KEY, '{broken')
    const repository = new BrowserStudyProgressRepository(localStorage)
    expect(await repository.load()).toEqual(createEmptyStudyStorage())
    expect(localStorage.getItem(STUDY_STORAGE_KEY)).toBe('{broken')
  })

  it('rejects incomplete imports before replacement', () => {
    expect(() => parseStudyStorage('{"version":1}')).toThrow(
      /invalid|incomplete/i,
    )
  })
})
