import { describe, expect, it } from 'vitest'
import { catalogueTenants, sampleCsvFor } from '../fixtures/tenants'
import {
  createPublication,
  parseProductRows,
  rejectedRowsCsv,
  updateProductRow,
  validateRows,
} from './catalogue'

const northstar = catalogueTenants[0]!
const bluehaven = catalogueTenants[1]!

describe('catalogue import and tenant rules', () => {
  it('parses CSV and spreadsheet-style tab-separated rows', () => {
    const csv = parseProductRows(sampleCsvFor(northstar), northstar)
    const tabs = parseProductRows(
      'sku\tname\tdescription\tcategory\tprice\tcurrency\tpackage_size\nBHG-10\tTrail cup\tA fictional trail cup\tOutdoor\t12.50\tEUR\t500ml',
      bluehaven,
    )

    expect(csv.rows).toHaveLength(2)
    expect(tabs.rows[0]).toMatchObject({
      sku: 'BHG-10',
      tenantValue: '500ml',
    })
  })

  it('requires the active tenant template and rejects another tenant header', () => {
    expect(parseProductRows(sampleCsvFor(northstar), bluehaven)).toEqual({
      rows: [],
      error:
        'Use these columns in order: sku, name, description, category, price, currency, package_size.',
    })
  })

  it('applies isolated prefixes, categories, currencies and tenant fields', () => {
    const parsed = parseProductRows(sampleCsvFor(northstar), northstar)
    const validated = validateRows(parsed.rows, northstar)

    expect(validated[0]).toMatchObject({ accepted: true, errors: {} })
    expect(validated[1]).toMatchObject({
      accepted: false,
      errors: {
        sku: 'Use an identifier beginning NST-.',
        category: 'Choose Home or Pantry.',
        currency: 'Use GBP for Northstar Market.',
        tenantValue: 'Enter a label in the format NS-0000.',
      },
    })
  })

  it('revalidates corrected fields and detects duplicate identifiers', () => {
    const parsed = parseProductRows(sampleCsvFor(northstar), northstar)
    let corrected = parsed.rows[1]!
    corrected = updateProductRow(corrected, 'sku', 'NST-1002')
    corrected = updateProductRow(corrected, 'name', 'Desk light')
    corrected = updateProductRow(
      corrected,
      'description',
      'A fictional adjustable desk light',
    )
    corrected = updateProductRow(corrected, 'category', 'Home')
    corrected = updateProductRow(corrected, 'price', '40.00')
    corrected = updateProductRow(corrected, 'currency', 'GBP')
    corrected = updateProductRow(corrected, 'tenantValue', 'NS-2040')

    expect(
      validateRows([parsed.rows[0]!, corrected], northstar)[1],
    ).toMatchObject({ accepted: true, errors: {} })
    expect(
      validateRows(
        [parsed.rows[0]!, { ...corrected, sku: parsed.rows[0]!.sku }],
        northstar,
      ).every(({ errors }) => Boolean(errors.sku)),
    ).toBe(true)
  })
})

describe('publication and rejection export', () => {
  const validated = validateRows(
    parseProductRows(sampleCsvFor(northstar), northstar).rows,
    northstar,
  )

  it('records accepted and rejected counts against the active tenant', () => {
    expect(
      createPublication(
        'BATCH-NORTHSTAR-TEST',
        '2026-08-03T12:00:00.000Z',
        northstar.id,
        validated,
      ),
    ).toEqual({
      id: 'BATCH-NORTHSTAR-TEST',
      tenantId: 'northstar',
      publishedCount: 1,
      rejectedCount: 1,
      publishedAt: '2026-08-03T12:00:00.000Z',
    })
  })

  it('exports rejected rows and excludes accepted product data', () => {
    const exported = rejectedRowsCsv(validated, northstar)
    expect(exported).toContain('WRONG-2')
    expect(exported).toContain('errors')
    expect(exported).not.toContain('NST-1001')
    expect(exported).not.toContain('Willow storage jar')
  })
})
