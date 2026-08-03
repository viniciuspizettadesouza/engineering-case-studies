import { beforeEach, describe, expect, it } from 'vitest'
import type { ProductRow, Publication } from '../domain/catalogue'
import {
  readCatalogueDraft,
  readPublications,
  saveCatalogueDraft,
  savePublication,
} from './catalogue-repository'

const row: ProductRow = {
  id: 'row-1',
  sku: 'NST-1',
  name: 'Fictional jar',
  description: 'A fictional storage jar',
  category: 'Home',
  price: '10.00',
  currency: 'GBP',
  tenantValue: 'NS-1000',
}

describe('tenant-scoped catalogue persistence', () => {
  beforeEach(() => window.localStorage.clear())

  it('does not expose one tenant draft through another tenant key', () => {
    saveCatalogueDraft(window.localStorage, 'northstar', [row])

    expect(readCatalogueDraft(window.localStorage, 'northstar')).toEqual([row])
    expect(readCatalogueDraft(window.localStorage, 'bluehaven')).toEqual([])
  })

  it('keeps publication histories isolated by tenant', () => {
    const publication: Publication = {
      id: 'BATCH-NORTHSTAR-TEST',
      tenantId: 'northstar',
      publishedCount: 1,
      rejectedCount: 0,
      publishedAt: '2026-08-03T12:00:00.000Z',
    }
    savePublication(window.localStorage, publication)

    expect(readPublications(window.localStorage, 'northstar')).toEqual([
      publication,
    ])
    expect(readPublications(window.localStorage, 'bluehaven')).toEqual([])
  })
})
