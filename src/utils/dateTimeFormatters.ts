import * as Localization from 'expo-localization'

const getFirstUserConfig = () => ({
  uses24hoursClock: Localization.getCalendars()[0].uses24hourClock,
  languageTag: Localization.getLocales()[0].languageTag,
})

function formatDate(date: Date) {
  const { languageTag } = getFirstUserConfig()

  return new Intl.DateTimeFormat(languageTag, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function formatTime(time: Date) {
  const { languageTag, uses24hoursClock } = getFirstUserConfig()

  return new Intl.DateTimeFormat(languageTag, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !uses24hoursClock,
  }).format(time)
}

function formatDateAndTime(date: Date | string) {
  const { languageTag, uses24hoursClock } = getFirstUserConfig()

  const formattedFullDate = new Date(date).toLocaleDateString(languageTag, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: !uses24hoursClock,
  })

  if (languageTag.startsWith('en')) {
    return formattedFullDate.replace(',', ' at')
  }

  if (languageTag.startsWith('pt')) {
    return formattedFullDate.replace(',', ' às')
  }

  return formattedFullDate
}

export { getFirstUserConfig, formatDate, formatTime, formatDateAndTime }
