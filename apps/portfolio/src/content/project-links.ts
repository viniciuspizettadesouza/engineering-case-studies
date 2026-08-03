export const repositoryUrl =
  'https://github.com/viniciuspizettadesouza/engineering-case-studies'

export const personalPortfolioUrl = 'https://viniciuspizettadesouza.github.io/'

const sourceDirectories: Readonly<Record<string, string>> = {
  'financial-operations-platform': 'financial-operations',
  'commerce-experience': 'commerce-experience',
  'accessible-transit-platform': 'accessible-transit',
  'modular-enterprise-workspace': 'modular-enterprise',
  'retail-insights-workspace': 'retail-insights',
}

export function studySourceUrl(slug: string): string {
  return `${repositoryUrl}/tree/main/apps/portfolio/src/case-studies/${sourceDirectories[slug] ?? slug}`
}
