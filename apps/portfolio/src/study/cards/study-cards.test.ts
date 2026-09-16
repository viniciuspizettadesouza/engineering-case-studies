import { describe, expect, it } from 'vitest'
import { studyCards, validateStudyCards } from './study-cards'

describe('study card catalog', () => {
  it('contains all nineteen technical exercises and valid handbook references', () => {
    expect(studyCards.filter((card) => card.type === 'exercise')).toHaveLength(
      19,
    )
    expect(validateStudyCards(studyCards)).toEqual([])
  })

  it('rejects duplicate IDs and broken references', () => {
    const first = studyCards[0]
    expect(first).toBeDefined()
    expect(
      validateStudyCards([
        first!,
        first!,
        { ...first!, id: 'broken-reference', headingId: 'missing-heading' },
      ]),
    ).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Duplicate'),
        expect.stringContaining('unknown heading'),
      ]),
    )
  })
})
