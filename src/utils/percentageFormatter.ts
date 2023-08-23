import { getFirstUserConfig } from './dateTimeFormatters'
export function percentageFormatter(value: number) {
  const percent = Number((value / 100).toFixed(4))
  const locale = getFirstUserConfig().languageTag

  const intlFormatter = Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: String(value).length > 3 ? 2 : 0,
  })

  return intlFormatter.format(percent)
}
