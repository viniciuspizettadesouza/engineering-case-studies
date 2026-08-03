export interface Store {
  readonly id: string
  readonly name: string
  readonly region: string
}
export interface DailyAggregate {
  readonly storeId: string
  readonly date: string
  readonly sales: number
  readonly previousSales: number
  readonly transactions: number
  readonly categories: Readonly<Record<string, number>>
  readonly stale?: boolean
}
export interface Insight {
  readonly id: string
  readonly storeId: string
  readonly date: string
  readonly title: string
  readonly observation: string
  readonly metric: string
  readonly category: string
  readonly generatedAt: string
  readonly confidence: 'moderate' | 'high'
  readonly limitation: string
}
export interface Summary {
  readonly sales: number
  readonly previousSales: number
  readonly transactions: number
  readonly averageBasket: number
  readonly changePercent: number
  readonly categories: readonly {
    readonly name: string
    readonly sales: number
  }[]
}

export function summarize(rows: readonly DailyAggregate[]): Summary {
  const sales = rows.reduce((sum, row) => sum + row.sales, 0)
  const previousSales = rows.reduce((sum, row) => sum + row.previousSales, 0)
  const transactions = rows.reduce((sum, row) => sum + row.transactions, 0)
  const categoryMap = new Map<string, number>()
  rows.forEach((row) =>
    Object.entries(row.categories).forEach(([name, value]) =>
      categoryMap.set(name, (categoryMap.get(name) ?? 0) + value),
    ),
  )
  return {
    sales,
    previousSales,
    transactions,
    averageBasket: transactions ? sales / transactions : 0,
    changePercent: previousSales
      ? ((sales - previousSales) / previousSales) * 100
      : 0,
    categories: [...categoryMap]
      .map(([name, value]) => ({ name, sales: value }))
      .sort((a, b) => b.sales - a.sales),
  }
}

export function rowsForSelection(
  rows: readonly DailyAggregate[],
  date: string,
  storeId: string,
): readonly DailyAggregate[] {
  return rows.filter(
    (row) =>
      row.date === date && (storeId === 'portfolio' || row.storeId === storeId),
  )
}

export function insightsForSelection(
  insights: readonly Insight[],
  date: string,
  storeId: string,
): readonly Insight[] {
  return insights.filter(
    (insight) =>
      insight.date === date &&
      (storeId === 'portfolio' || insight.storeId === storeId),
  )
}
