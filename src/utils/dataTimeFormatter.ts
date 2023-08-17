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

function formatDateAndTime(date: Date | string) {
  const formattedFullDate = new Date(date).toLocaleDateString(
    userConfig.languageTag,
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    },
  )

  if (userConfig.languageTag.startsWith('en')) {
    return formattedFullDate.replace(',', ' at')
  }

  if (userConfig.languageTag.startsWith('pt')) {
    return formattedFullDate.replace(',', ' às')
  }

  return formattedFullDate
}
export { userConfig, formatDate, formatTime, formatDateAndTime }
