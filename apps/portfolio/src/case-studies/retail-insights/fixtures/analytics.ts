import type { DailyAggregate, Insight, Store } from '../domain/analytics'
export const stores: readonly Store[] = [
  { id: 'harbour', name: 'Harbour Row', region: 'Northmere' },
  { id: 'orchard', name: 'Orchard Vale', region: 'Northmere' },
  { id: 'cedar', name: 'Cedar Square', region: 'Northmere' },
]
export const aggregates: readonly DailyAggregate[] = [
  {
    storeId: 'harbour',
    date: '2027-06-18',
    sales: 18420,
    previousSales: 16900,
    transactions: 612,
    categories: { Grocery: 9200, Home: 5020, Wellness: 4200 },
  },
  {
    storeId: 'orchard',
    date: '2027-06-18',
    sales: 15100,
    previousSales: 15800,
    transactions: 530,
    categories: { Grocery: 8100, Home: 3900, Wellness: 3100 },
  },
  {
    storeId: 'cedar',
    date: '2027-06-18',
    sales: 12760,
    previousSales: 11900,
    transactions: 455,
    categories: { Grocery: 6500, Home: 3260, Wellness: 3000 },
  },
  {
    storeId: 'harbour',
    date: '2027-06-17',
    sales: 16900,
    previousSales: 17200,
    transactions: 580,
    categories: { Grocery: 8700, Home: 4500, Wellness: 3700 },
    stale: true,
  },
  {
    storeId: 'orchard',
    date: '2027-06-17',
    sales: 15800,
    previousSales: 15100,
    transactions: 548,
    categories: { Grocery: 8200, Home: 4100, Wellness: 3500 },
    stale: true,
  },
  {
    storeId: 'cedar',
    date: '2027-06-17',
    sales: 11900,
    previousSales: 12200,
    transactions: 430,
    categories: { Grocery: 6100, Home: 3000, Wellness: 2800 },
    stale: true,
  },
]
export const insights: readonly Insight[] = [
  {
    id: 'harbour-growth',
    storeId: 'harbour',
    date: '2027-06-18',
    title: 'Harbour Row sales increased',
    observation:
      'Sales were 9.0% above the fictional comparison period, led by Grocery.',
    metric: 'Daily sales',
    category: 'Grocery',
    generatedAt: '2027-06-19T06:15:00Z',
    confidence: 'high',
    limitation:
      'This comparison does not account for promotions, weather or local events.',
  },
  {
    id: 'orchard-change',
    storeId: 'orchard',
    date: '2027-06-18',
    title: 'Orchard Vale sales softened',
    observation:
      'Sales were 4.4% below the fictional comparison period; all values remain descriptive.',
    metric: 'Daily sales',
    category: 'Grocery',
    generatedAt: '2027-06-19T06:15:00Z',
    confidence: 'moderate',
    limitation: 'One day cannot establish a trend or explain causation.',
  },
  {
    id: 'cedar-basket',
    storeId: 'cedar',
    date: '2027-06-18',
    title: 'Cedar Square average basket rose',
    observation:
      'The fictional average basket was £28.04 across 455 transactions.',
    metric: 'Average basket',
    category: 'Home',
    generatedAt: '2027-06-19T06:15:00Z',
    confidence: 'moderate',
    limitation:
      'Aggregates exclude returns and do not represent individual customers.',
  },
]
