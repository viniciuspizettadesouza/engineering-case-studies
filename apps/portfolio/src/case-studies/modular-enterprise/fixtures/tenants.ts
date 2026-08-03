import type { CatalogueTenant } from '../domain/catalogue'

export const catalogueTenants: readonly CatalogueTenant[] = [
  {
    id: 'northstar',
    name: 'Northstar Market',
    tagline: 'Everyday fictional home and pantry products.',
    skuPrefix: 'NST-',
    categories: ['Home', 'Pantry'],
    currency: 'GBP',
    tenantField: {
      csvHeader: 'compliance_label',
      label: 'Compliance label',
      hint: 'Required format: NS- followed by 4 digits.',
      pattern: /^NS-\d{4}$/,
      error: 'Enter a label in the format NS-0000.',
    },
    tokens: {
      primary: '#4338ca',
      primaryDark: '#a5b4fc',
      surface: '#eef2ff',
      focus: '#4f46e5',
    },
  },
  {
    id: 'bluehaven',
    name: 'Bluehaven Goods',
    tagline: 'Fictional outdoor and wellbeing essentials.',
    skuPrefix: 'BHG-',
    categories: ['Outdoor', 'Wellness'],
    currency: 'EUR',
    tenantField: {
      csvHeader: 'package_size',
      label: 'Package size',
      hint: 'Required format: a number followed by ml, g or pack.',
      pattern: /^\d+(ml|g|pack)$/i,
      error: 'Enter a size such as 500ml, 250g or 4pack.',
    },
    tokens: {
      primary: '#0f766e',
      primaryDark: '#5eead4',
      surface: '#f0fdfa',
      focus: '#0d9488',
    },
  },
]

export function findCatalogueTenant(
  id: string | undefined,
): CatalogueTenant | undefined {
  return catalogueTenants.find((tenant) => tenant.id === id)
}

export function sampleCsvFor(tenant: CatalogueTenant): string {
  const header = `sku,name,description,category,price,currency,${tenant.tenantField.csvHeader}`
  return tenant.id === 'northstar'
    ? `${header}\nNST-1001,Willow storage jar,A fictional ceramic pantry jar,Pantry,18.50,GBP,NS-1042\nWRONG-2,Desk light,Too short,Electronics,-4,EUR,bad`
    : `${header}\nBHG-2001,Tide trail bottle,A fictional insulated outdoor bottle,Outdoor,24.00,EUR,750ml\nNST-1001,Hand balm,Too short,Beauty,9.999,GBP,large`
}
