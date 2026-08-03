import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  insightsForSelection,
  rowsForSelection,
  summarize,
} from '../domain/analytics'
import { aggregates, insights, stores } from '../fixtures/analytics'

const money = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})
type DemoState = 'ready' | 'loading' | 'empty' | 'failure'
export function InsightsPage() {
  const [storeId, setStoreId] = useState('portfolio')
  const [date, setDate] = useState('2027-06-18')
  const [state, setState] = useState<DemoState>('ready')
  const [selectedId, setSelectedId] = useState('harbour-growth')
  const rows = useMemo(
    () =>
      state === 'empty' ? [] : rowsForSelection(aggregates, date, storeId),
    [date, storeId, state],
  )
  const summary = summarize(rows)
  const availableInsights = insightsForSelection(insights, date, storeId)
  const selected =
    availableInsights.find(({ id }) => id === selectedId) ??
    availableInsights[0]
  const selectedStore = stores.find(({ id }) => id === selected?.storeId)
  const supportingRow = rows.find(({ storeId: id }) => id === selected?.storeId)
  return (
    <main id="main-content" tabIndex={-1}>
      <Container className="py-12 sm:py-16">
        <Link
          className="text-sm font-semibold text-teal-700 underline dark:text-teal-300"
          to="/case-studies/retail-insights-workspace"
        >
          ← Case study
        </Link>
        <Eyebrow className="mt-10">
          Northmere region / fictional analytics
        </Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950 sm:text-5xl dark:text-white">
          Daily retail insights
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          Review deterministic store aggregates and verify every simulated
          AI-assisted observation against its supporting data.
        </p>
        <section
          aria-label="Dashboard filters"
          className="mt-8 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <label
              className="font-semibold text-slate-800 dark:text-slate-100"
              htmlFor="insights-view"
            >
              View
            </label>
            <select
              id="insights-view"
              className="mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 dark:border-slate-700 dark:bg-slate-950"
              value={storeId}
              onChange={(e) => {
                setStoreId(e.target.value)
                setSelectedId('')
              }}
            >
              <option value="portfolio">Northmere portfolio</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="font-semibold text-slate-800 dark:text-slate-100"
              htmlFor="insights-date"
            >
              Reporting date
            </label>
            <select
              id="insights-date"
              className="mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 dark:border-slate-700 dark:bg-slate-950"
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                setSelectedId('')
              }}
            >
              <option value="2027-06-18">18 June 2027</option>
              <option value="2027-06-17">17 June 2027 (stale)</option>
              <option value="2027-06-16">16 June 2027 (no data)</option>
            </select>
          </div>
          <div>
            <label
              className="font-semibold text-slate-800 dark:text-slate-100"
              htmlFor="insights-state"
            >
              Demo service state
            </label>
            <select
              id="insights-state"
              className="mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 dark:border-slate-700 dark:bg-slate-950"
              value={state}
              onChange={(e) => setState(e.target.value as DemoState)}
            >
              <option value="ready">Ready</option>
              <option value="loading">Loading</option>
              <option value="empty">Empty data</option>
              <option value="failure">Analysis failure</option>
            </select>
          </div>
        </section>
        {state === 'loading' ? (
          <p className="mt-8 rounded-xl bg-slate-100 p-6" role="status">
            Loading the fictional snapshot…
          </p>
        ) : rows.length === 0 ? (
          <section className="mt-8 rounded-xl border border-slate-300 p-6">
            <h2 className="text-xl font-semibold">
              No data for this selection
            </h2>
            <p className="mt-2">
              Choose another reporting date or restore the ready demo state.
            </p>
          </section>
        ) : (
          <>
            {rows.some(({ stale }) => stale) ? (
              <p
                className="mt-6 rounded-lg border border-amber-500 bg-amber-50 p-4 text-amber-950"
                role="status"
              >
                <strong>Stale snapshot.</strong> Data has not refreshed since 18
                June 2027 at 06:00 UTC.
              </p>
            ) : null}
            <section aria-labelledby="overview-heading" className="mt-8">
              <h2 id="overview-heading" className="text-2xl font-semibold">
                Sales overview
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['Sales', money.format(summary.sales)],
                  [
                    'Transactions',
                    summary.transactions.toLocaleString('en-GB'),
                  ],
                  ['Average basket', money.format(summary.averageBasket)],
                  [
                    'Previous-period change',
                    `${summary.changePercent >= 0 ? '+' : ''}${summary.changePercent.toFixed(1)}%`,
                  ],
                ].map(([label, value]) => (
                  <article
                    className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                    key={label}
                  >
                    <h3 className="text-sm text-slate-500">{label}</h3>
                    <p className="mt-2 text-2xl font-semibold">{value}</p>
                  </article>
                ))}
              </div>
            </section>
            <section
              aria-labelledby="category-heading"
              className="mt-10 grid gap-6 lg:grid-cols-2"
            >
              <div>
                <h2 id="category-heading" className="text-2xl font-semibold">
                  Category sales
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Bar lengths repeat the exact values in the adjacent table.
                </p>
                <div aria-hidden="true" className="mt-5 space-y-4">
                  {summary.categories.map((item) => (
                    <div key={item.name}>
                      <span className="text-sm font-semibold">{item.name}</span>
                      <div
                        className="mt-1 h-5 rounded bg-teal-700"
                        style={{
                          width: `${Math.max(8, (item.sales / summary.categories[0]!.sales) * 100)}%`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <table className="self-end rounded-xl border border-slate-200 bg-white text-left dark:border-slate-800 dark:bg-slate-900">
                <caption className="p-3 text-left font-semibold">
                  Category data table
                </caption>
                <thead>
                  <tr>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.categories.map((item) => (
                    <tr key={item.name}>
                      <th className="px-3 py-2" scope="row">
                        {item.name}
                      </th>
                      <td className="px-3 py-2">{money.format(item.sales)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section aria-labelledby="insights-heading" className="mt-10">
              <div className="flex flex-wrap items-center gap-3">
                <h2 id="insights-heading" className="text-2xl font-semibold">
                  Simulated AI-assisted insights
                </h2>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-900">
                  Potentially fallible
                </span>
              </div>
              {state === 'failure' ? (
                <div
                  className="mt-5 rounded-xl border-2 border-red-600 bg-red-50 p-5"
                  role="alert"
                >
                  <h3 className="font-semibold">
                    Insights could not be loaded
                  </h3>
                  <p className="mt-2 text-sm">
                    The underlying sales overview remains available above.
                  </p>
                </div>
              ) : availableInsights.length === 0 ? (
                <p className="mt-5 rounded-xl border p-5">
                  No generated insights are available for this date.
                </p>
              ) : (
                <div className="mt-5 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                  <ul className="space-y-3">
                    {availableInsights.map((insight) => (
                      <li key={insight.id}>
                        <button
                          aria-pressed={selected?.id === insight.id}
                          className="min-h-11 w-full rounded-xl border border-slate-300 p-4 text-left font-semibold outline-offset-2 aria-pressed:border-violet-600 aria-pressed:bg-violet-50 dark:border-slate-700 dark:aria-pressed:bg-violet-950"
                          onClick={() => setSelectedId(insight.id)}
                        >
                          {insight.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {selected && supportingRow ? (
                    <article
                      aria-labelledby="selected-insight"
                      className="rounded-xl border border-violet-300 bg-white p-6 dark:border-violet-800 dark:bg-slate-900"
                    >
                      <p className="text-xs font-semibold uppercase text-violet-700">
                        {selectedStore?.name} · {selected.confidence} simulated
                        confidence
                      </p>
                      <h3
                        id="selected-insight"
                        className="mt-2 text-xl font-semibold"
                      >
                        {selected.title}
                      </h3>
                      <p className="mt-3">{selected.observation}</p>
                      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                        <div>
                          <dt className="font-semibold">Supporting metric</dt>
                          <dd>
                            {selected.metric}:{' '}
                            {money.format(supportingRow.sales)}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold">Generated</dt>
                          <dd>19 June 2027, 06:15 UTC</dd>
                        </div>
                        <div>
                          <dt className="font-semibold">Data period</dt>
                          <dd>{selected.date}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold">Limitation</dt>
                          <dd>{selected.limitation}</dd>
                        </div>
                      </dl>
                    </article>
                  ) : null}
                </div>
              )}
            </section>
          </>
        )}
        <aside className="mt-10 text-sm text-slate-600">
          Fictional aggregated data only. No live model, customer data,
          recommendation or autonomous action is used.
        </aside>
      </Container>
    </main>
  )
}
