export type ProductField =
  | 'sku'
  | 'name'
  | 'description'
  | 'category'
  | 'price'
  | 'currency'
  | 'tenantValue'

export interface CatalogueTokens {
  readonly primary: string
  readonly primaryDark: string
  readonly surface: string
  readonly focus: string
}

export interface CatalogueTenant {
  readonly id: string
  readonly name: string
  readonly tagline: string
  readonly skuPrefix: string
  readonly categories: readonly string[]
  readonly currency: 'GBP' | 'EUR'
  readonly tenantField: {
    readonly csvHeader: string
    readonly label: string
    readonly hint: string
    readonly pattern: RegExp
    readonly error: string
  }
  readonly tokens: CatalogueTokens
}

export interface ProductRow {
  readonly id: string
  readonly sku: string
  readonly name: string
  readonly description: string
  readonly category: string
  readonly price: string
  readonly currency: string
  readonly tenantValue: string
}

export type RowErrors = Partial<Record<ProductField, string>>

export interface ValidatedRow {
  readonly row: ProductRow
  readonly errors: RowErrors
  readonly accepted: boolean
}

export interface ParseResult {
  readonly rows: readonly ProductRow[]
  readonly error?: string
}

export interface Publication {
  readonly id: string
  readonly tenantId: string
  readonly publishedCount: number
  readonly rejectedCount: number
  readonly publishedAt: string
}

export const commonCsvHeaders = [
  'sku',
  'name',
  'description',
  'category',
  'price',
  'currency',
] as const

export function parseProductRows(
  source: string,
  tenant: CatalogueTenant,
): ParseResult {
  const records = parseDelimitedRecords(source)
  if (records.length === 0) {
    return { rows: [], error: 'Paste product rows or choose a CSV file.' }
  }

  const expectedHeaders = [...commonCsvHeaders, tenant.tenantField.csvHeader]
  const headers = records[0]!.map((value) => value.trim().toLowerCase())
  if (
    headers.length !== expectedHeaders.length ||
    expectedHeaders.some((header, index) => headers[index] !== header)
  ) {
    return {
      rows: [],
      error: `Use these columns in order: ${expectedHeaders.join(', ')}.`,
    }
  }

  const rows = records.slice(1).map((record, index) => ({
    id: `row-${index + 1}`,
    sku: record[0]?.trim() ?? '',
    name: record[1]?.trim() ?? '',
    description: record[2]?.trim() ?? '',
    category: record[3]?.trim() ?? '',
    price: record[4]?.trim() ?? '',
    currency: record[5]?.trim().toUpperCase() ?? '',
    tenantValue: record[6]?.trim() ?? '',
  }))

  if (rows.length === 0) {
    return { rows: [], error: 'The template contains no product rows.' }
  }

  return { rows }
}

export function validateRows(
  rows: readonly ProductRow[],
  tenant: CatalogueTenant,
): readonly ValidatedRow[] {
  const skuCounts = rows.reduce<Map<string, number>>((counts, row) => {
    const key = row.sku.toUpperCase()
    if (key) counts.set(key, (counts.get(key) ?? 0) + 1)
    return counts
  }, new Map())

  return rows.map((row) => {
    const errors: RowErrors = {}
    if (!row.sku.startsWith(tenant.skuPrefix)) {
      errors.sku = `Use an identifier beginning ${tenant.skuPrefix}.`
    } else if ((skuCounts.get(row.sku.toUpperCase()) ?? 0) > 1) {
      errors.sku = 'Use a unique identifier within this batch.'
    }
    if (row.name.trim().length < 2) {
      errors.name = 'Enter a product name with at least 2 characters.'
    }
    if (row.description.trim().length < 10) {
      errors.description = 'Enter a description with at least 10 characters.'
    }
    if (!tenant.categories.includes(row.category)) {
      errors.category = `Choose ${tenant.categories.join(' or ')}.`
    }
    const price = Number(row.price)
    if (
      !Number.isFinite(price) ||
      price <= 0 ||
      !/^\d+(\.\d{1,2})?$/.test(row.price)
    ) {
      errors.price =
        'Enter a positive price with no more than 2 decimal places.'
    }
    if (row.currency !== tenant.currency) {
      errors.currency = `Use ${tenant.currency} for ${tenant.name}.`
    }
    if (!tenant.tenantField.pattern.test(row.tenantValue)) {
      errors.tenantValue = tenant.tenantField.error
    }
    return { row, errors, accepted: Object.keys(errors).length === 0 }
  })
}

export function updateProductRow(
  row: ProductRow,
  field: ProductField,
  value: string,
): ProductRow {
  return { ...row, [field]: value }
}

export function rejectedRowsCsv(
  validatedRows: readonly ValidatedRow[],
  tenant: CatalogueTenant,
): string {
  const headers = [...commonCsvHeaders, tenant.tenantField.csvHeader, 'errors']
  const rejected = validatedRows.filter(({ accepted }) => !accepted)
  return [
    headers,
    ...rejected.map(({ row, errors }) => [
      row.sku,
      row.name,
      row.description,
      row.category,
      row.price,
      row.currency,
      row.tenantValue,
      Object.values(errors).join(' '),
    ]),
  ]
    .map((record) => record.map(escapeCsvCell).join(','))
    .join('\n')
}

export function createPublication(
  id: string,
  publishedAt: string,
  tenantId: string,
  validatedRows: readonly ValidatedRow[],
): Publication {
  return {
    id,
    tenantId,
    publishedCount: validatedRows.filter(({ accepted }) => accepted).length,
    rejectedCount: validatedRows.filter(({ accepted }) => !accepted).length,
    publishedAt,
  }
}

function parseDelimitedRecords(source: string): string[][] {
  const delimiter = source.split(/\r?\n/, 1)[0]?.includes('\t') ? '\t' : ','
  const records: string[][] = []
  let record: string[] = []
  let cell = ''
  let quoted = false

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index]!
    if (character === '"') {
      if (quoted && source[index + 1] === '"') {
        cell += '"'
        index += 1
      } else {
        quoted = !quoted
      }
    } else if (character === delimiter && !quoted) {
      record.push(cell)
      cell = ''
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && source[index + 1] === '\n') index += 1
      record.push(cell)
      if (record.some((value) => value.trim())) records.push(record)
      record = []
      cell = ''
    } else {
      cell += character
    }
  }
  record.push(cell)
  if (record.some((value) => value.trim())) records.push(record)
  return records
}

function escapeCsvCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value
}
