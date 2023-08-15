import * as Localization from 'expo-localization'

const userConfig = {
  uses24hoursClock:
    Localization?.getCalendars?.()?.[0]?.uses24hourClock ?? true,
  languageTag: Localization?.getLocales?.()?.[0]?.languageTag ?? 'en-US',
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(userConfig.languageTag, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function formatTime(time: Date) {
  return new Intl.DateTimeFormat(userConfig.languageTag, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !userConfig.uses24hoursClock,
  }).format(time)
}

export { userConfig, formatDate, formatTime }
