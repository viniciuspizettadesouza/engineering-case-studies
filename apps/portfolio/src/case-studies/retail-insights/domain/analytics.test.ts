import { describe, expect, it } from 'vitest'
import { aggregates, insights } from '../fixtures/analytics'
import { insightsForSelection, rowsForSelection, summarize } from './analytics'
describe('retail analytics', () => {
  it('keeps store and portfolio selections consistent', () => {
    expect(rowsForSelection(aggregates, '2027-06-18', 'harbour')).toHaveLength(
      1,
    )
    expect(
      rowsForSelection(aggregates, '2027-06-18', 'portfolio'),
    ).toHaveLength(3)
  })
  it('calculates portfolio KPIs and ranked categories', () => {
    const value = summarize(
      rowsForSelection(aggregates, '2027-06-18', 'portfolio'),
    )
    expect(value.sales).toBe(46280)
    expect(value.transactions).toBe(1597)
    expect(value.categories[0]).toEqual({ name: 'Grocery', sales: 23800 })
  })
  it('links insights only to the selected data slice', () => {
    expect(
      insightsForSelection(insights, '2027-06-18', 'harbour').map(
        ({ id }) => id,
      ),
    ).toEqual(['harbour-growth'])
    expect(insightsForSelection(insights, '2027-06-17', 'portfolio')).toEqual(
      [],
    )
  })
})
