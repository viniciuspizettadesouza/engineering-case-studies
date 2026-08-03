import {
  type ChangeEvent,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {
  createPublication,
  parseProductRows,
  rejectedRowsCsv,
  updateProductRow,
  validateRows,
  type ProductField,
  type ProductRow,
  type ValidatedRow,
  type CatalogueTenant,
} from '../domain/catalogue'
import { findCatalogueTenant, sampleCsvFor } from '../fixtures/tenants'
import {
  readCatalogueDraft,
  saveCatalogueDraft,
  savePublication,
} from '../services/catalogue-repository'
import {
  CatalogueLayout,
  catalogueBasePath,
  cataloguePrimaryButton,
  catalogueSecondaryButton,
} from '../components/catalogue-layout'

type ImportMode = 'paste' | 'upload'

const fieldClassName =
  'min-h-11 w-full min-w-36 rounded-md border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-950 outline-none focus:border-[var(--catalogue-focus)] focus:ring-2 focus:ring-[var(--catalogue-focus)]/20 aria-invalid:border-red-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white'

export function CatalogueWorkspacePage() {
  const { tenantId } = useParams()
  const tenant = findCatalogueTenant(tenantId)

  if (!tenant) {
    return <Navigate replace to={`${catalogueBasePath}/northstar`} />
  }

  return <TenantCatalogueWorkspace key={tenant.id} tenant={tenant} />
}

function TenantCatalogueWorkspace({
  tenant,
}: {
  readonly tenant: CatalogueTenant
}) {
  const [mode, setMode] = useState<ImportMode>('paste')
  const [source, setSource] = useState(() => sampleCsvFor(tenant))
  const [rows, setRows] = useState<readonly ProductRow[]>(() =>
    readCatalogueDraft(window.localStorage, tenant.id),
  )
  const [importError, setImportError] = useState('')
  const [publishedMessage, setPublishedMessage] = useState('')
  const [simulateFailure, setSimulateFailure] = useState(false)
  const [focusRequest, setFocusRequest] = useState(0)
  const summaryRef = useRef<HTMLDivElement>(null)

  const validatedRows = useMemo(
    () => validateRows(rows, tenant),
    [rows, tenant],
  )

  useEffect(() => {
    if (focusRequest > 0) summaryRef.current?.focus()
  }, [focusRequest, importError, publishedMessage, validatedRows])

  const acceptedCount = validatedRows.filter(({ accepted }) => accepted).length
  const rejectedCount = validatedRows.length - acceptedCount

  const importRows = (value: string) => {
    const result = parseProductRows(value, tenant)
    if (result.error) {
      setImportError(result.error)
      setRows([])
      setFocusRequest((current) => current + 1)
      return
    }
    setImportError('')
    setRows(result.rows)
    saveCatalogueDraft(window.localStorage, tenant.id, result.rows)
    setPublishedMessage('')
    if (validateRows(result.rows, tenant).some(({ accepted }) => !accepted)) {
      setFocusRequest((current) => current + 1)
    }
  }

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setImportError('Choose a file with a .csv extension.')
      setFocusRequest((current) => current + 1)
      return
    }
    void file.text().then((value) => {
      setSource(value)
      importRows(value)
    })
  }

  const editRow = (rowId: string, field: ProductField, value: string) => {
    const updated = rows.map((row) =>
      row.id === rowId ? updateProductRow(row, field, value) : row,
    )
    setRows(updated)
    saveCatalogueDraft(window.localStorage, tenant.id, updated)
    setPublishedMessage('')
  }

  const publish = () => {
    if (simulateFailure) {
      setPublishedMessage(
        'The simulated catalogue service did not publish this batch. Your tenant draft is safe; clear the failure option and retry.',
      )
      setFocusRequest((current) => current + 1)
      return
    }
    const publication = createPublication(
      `BATCH-${tenant.id.toUpperCase()}-${Date.now()}`,
      new Date().toISOString(),
      tenant.id,
      validatedRows,
    )
    savePublication(window.localStorage, publication)
    setPublishedMessage(
      `${publication.id}: ${publication.publishedCount} accepted product${publication.publishedCount === 1 ? '' : 's'} published for ${tenant.name}. ${publication.rejectedCount} rejected row${publication.rejectedCount === 1 ? '' : 's'} stayed in the draft.`,
    )
  }

  const exportRejected = () => {
    const blob = new Blob([rejectedRowsCsv(validatedRows, tenant)], {
      type: 'text/csv;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${tenant.id}-rejected-products.csv`
    document.body.append(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <CatalogueLayout tenant={tenant}>
      <section
        aria-labelledby="template-heading"
        className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900"
      >
        <h2
          className="text-xl font-semibold text-slate-950 dark:text-white"
          id="template-heading"
        >
          1. Add product rows
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Required columns: sku, name, description, category, price, currency,
          {` ${tenant.tenantField.csvHeader}`}. {tenant.tenantField.hint}
        </p>
        <div
          aria-label="Import method"
          className="mt-5 flex gap-2"
          role="tablist"
        >
          <button
            aria-controls="paste-panel"
            aria-selected={mode === 'paste'}
            className={
              mode === 'paste'
                ? cataloguePrimaryButton
                : catalogueSecondaryButton
            }
            id="paste-tab"
            onClick={() => setMode('paste')}
            role="tab"
            type="button"
          >
            Paste rows
          </button>
          <button
            aria-controls="upload-panel"
            aria-selected={mode === 'upload'}
            className={
              mode === 'upload'
                ? cataloguePrimaryButton
                : catalogueSecondaryButton
            }
            id="upload-tab"
            onClick={() => setMode('upload')}
            role="tab"
            type="button"
          >
            Upload CSV
          </button>
        </div>
        {mode === 'paste' ? (
          <div
            aria-labelledby="paste-tab"
            className="mt-5"
            id="paste-panel"
            role="tabpanel"
          >
            <label
              className="font-semibold text-slate-800 dark:text-slate-100"
              htmlFor="productRows"
            >
              CSV or spreadsheet rows
            </label>
            <textarea
              className="mt-2 min-h-48 w-full rounded-lg border border-slate-300 bg-white p-3 font-mono text-sm text-slate-950 outline-none focus:border-[var(--catalogue-focus)] focus:ring-2 focus:ring-[var(--catalogue-focus)]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              id="productRows"
              onChange={(event) => setSource(event.target.value)}
              spellCheck={false}
              value={source}
            />
            <button
              className={`${cataloguePrimaryButton} mt-4`}
              onClick={() => importRows(source)}
              type="button"
            >
              Preview and validate
            </button>
          </div>
        ) : (
          <div
            aria-labelledby="upload-tab"
            className="mt-5"
            id="upload-panel"
            role="tabpanel"
          >
            <label
              className="block font-semibold text-slate-800 dark:text-slate-100"
              htmlFor="csvFile"
            >
              Product CSV file
            </label>
            <input
              accept=".csv,text/csv"
              className="mt-2 block min-h-11 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-800 file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:file:bg-slate-800"
              id="csvFile"
              onChange={handleFile}
              type="file"
            />
          </div>
        )}
      </section>

      {importError ? (
        <div
          className="mt-6 rounded-xl border-2 border-red-600 bg-red-50 p-5 text-red-950 dark:bg-red-950/30 dark:text-red-100"
          ref={summaryRef}
          role="alert"
          tabIndex={-1}
        >
          <h2 className="font-semibold">The rows could not be imported</h2>
          <p className="mt-2 text-sm">{importError}</p>
        </div>
      ) : null}

      {validatedRows.length > 0 ? (
        <Preview
          acceptedCount={acceptedCount}
          onEdit={editRow}
          rejectedCount={rejectedCount}
          rows={validatedRows}
          summaryRef={summaryRef}
          tenantFieldLabel={tenant.tenantField.label}
        />
      ) : null}

      {validatedRows.length > 0 ? (
        <section
          aria-labelledby="publish-heading"
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900"
        >
          <h2
            className="text-xl font-semibold text-slate-950 dark:text-white"
            id="publish-heading"
          >
            3. Publish accepted products
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Publishing is simulated locally. Rejected rows remain editable and
            are never included in the accepted batch.
          </p>
          <label className="mt-5 flex max-w-xl items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
            <input
              className="mt-1 size-4 accent-[var(--catalogue-primary)]"
              checked={simulateFailure}
              onChange={(event) => setSimulateFailure(event.target.checked)}
              type="checkbox"
            />
            Simulate one catalogue service failure
          </label>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className={cataloguePrimaryButton}
              disabled={acceptedCount === 0}
              onClick={publish}
              type="button"
            >
              Publish {acceptedCount} accepted product
              {acceptedCount === 1 ? '' : 's'}
            </button>
            <button
              className={catalogueSecondaryButton}
              disabled={rejectedCount === 0}
              onClick={exportRejected}
              type="button"
            >
              Export {rejectedCount} rejected row
              {rejectedCount === 1 ? '' : 's'}
            </button>
          </div>
          {publishedMessage ? (
            <div
              className="mt-5 rounded-lg border border-[var(--catalogue-primary)] bg-[var(--catalogue-surface)] p-4 text-sm text-slate-800 dark:bg-slate-950 dark:text-slate-100"
              role={simulateFailure ? 'alert' : 'status'}
              tabIndex={simulateFailure ? -1 : undefined}
              ref={simulateFailure ? summaryRef : undefined}
            >
              {publishedMessage}
            </div>
          ) : null}
        </section>
      ) : null}
    </CatalogueLayout>
  )
}

function Preview({
  rows,
  acceptedCount,
  rejectedCount,
  tenantFieldLabel,
  onEdit,
  summaryRef,
}: {
  readonly rows: readonly ValidatedRow[]
  readonly acceptedCount: number
  readonly rejectedCount: number
  readonly tenantFieldLabel: string
  readonly onEdit: (rowId: string, field: ProductField, value: string) => void
  readonly summaryRef: RefObject<HTMLDivElement | null>
}) {
  const errorLinks = rows.flatMap(({ row, errors }, index) =>
    Object.entries(errors).map(([field, message]) => ({
      id: `${row.id}-${field}`,
      label: `Row ${index + 1}, ${field === 'tenantValue' ? tenantFieldLabel : field}: ${message}`,
    })),
  )

  return (
    <section
      aria-labelledby="preview-heading"
      className="mt-8 min-w-0 max-w-full overflow-hidden"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            className="text-xl font-semibold text-slate-950 dark:text-white"
            id="preview-heading"
          >
            2. Review and correct
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {rows.length} total · {acceptedCount} accepted · {rejectedCount}{' '}
            rejected
          </p>
        </div>
      </div>
      {errorLinks.length > 0 ? (
        <div
          className="mt-5 rounded-xl border-2 border-red-600 bg-red-50 p-5 text-red-950 dark:bg-red-950/30 dark:text-red-100"
          ref={summaryRef}
          role="alert"
          tabIndex={-1}
        >
          <h3 className="font-semibold">
            Correct {errorLinks.length} validation issue
            {errorLinks.length === 1 ? '' : 's'}
          </h3>
          <ul className="mt-3 max-h-44 list-disc space-y-1 overflow-auto pl-5 text-sm">
            {errorLinks.map(({ id, label }) => (
              <li key={id}>
                <a className="underline underline-offset-2" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p
          className="mt-5 rounded-lg border border-green-600 bg-green-50 p-4 text-sm text-green-950 dark:bg-green-950/30 dark:text-green-100"
          role="status"
        >
          Every row is ready for simulated publishing.
        </p>
      )}
      <div className="mt-5 w-full max-w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Imported product rows and validation results
          </caption>
          <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              {[
                'Status',
                'SKU',
                'Name',
                'Description',
                'Category',
                'Price',
                'Currency',
                tenantFieldLabel,
              ].map((heading) => (
                <th className="px-3 py-3" key={heading} scope="col">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {rows.map(({ row, errors, accepted }, index) => (
              <tr key={row.id}>
                <th
                  className="whitespace-nowrap px-3 py-4 align-top text-sm font-semibold"
                  scope="row"
                >
                  <span
                    className={
                      accepted
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }
                  >
                    Row {index + 1}: {accepted ? 'Accepted' : 'Rejected'}
                  </span>
                </th>
                <EditableCell
                  error={errors.sku}
                  field="sku"
                  label={`Row ${index + 1} SKU`}
                  onEdit={onEdit}
                  row={row}
                />
                <EditableCell
                  error={errors.name}
                  field="name"
                  label={`Row ${index + 1} name`}
                  onEdit={onEdit}
                  row={row}
                />
                <EditableCell
                  error={errors.description}
                  field="description"
                  label={`Row ${index + 1} description`}
                  onEdit={onEdit}
                  row={row}
                />
                <EditableCell
                  error={errors.category}
                  field="category"
                  label={`Row ${index + 1} category`}
                  onEdit={onEdit}
                  row={row}
                />
                <EditableCell
                  error={errors.price}
                  field="price"
                  label={`Row ${index + 1} price`}
                  onEdit={onEdit}
                  row={row}
                />
                <EditableCell
                  error={errors.currency}
                  field="currency"
                  label={`Row ${index + 1} currency`}
                  onEdit={onEdit}
                  row={row}
                />
                <EditableCell
                  error={errors.tenantValue}
                  field="tenantValue"
                  label={`Row ${index + 1} ${tenantFieldLabel}`}
                  onEdit={onEdit}
                  row={row}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function EditableCell({
  row,
  field,
  label,
  error,
  onEdit,
}: {
  readonly row: ProductRow
  readonly field: ProductField
  readonly label: string
  readonly error?: string
  readonly onEdit: (rowId: string, field: ProductField, value: string) => void
}) {
  const id = `${row.id}-${field}`
  const errorId = `${id}-error`
  return (
    <td className="min-w-44 px-3 py-4 align-top">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={fieldClassName}
        id={id}
        onChange={(event) => onEdit(row.id, field, event.target.value)}
        value={row[field]}
      />
      {error ? (
        <p
          className="mt-2 max-w-52 text-xs font-medium text-red-700 dark:text-red-300"
          id={errorId}
        >
          {error}
        </p>
      ) : null}
    </td>
  )
}
