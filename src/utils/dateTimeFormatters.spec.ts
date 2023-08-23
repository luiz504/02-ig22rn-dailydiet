import { formatDate, formatDateAndTime, formatTime } from './dateTimeFormatters'
import * as Localization from 'expo-localization'
describe('Date & Time formatters', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const useMockUserConfig = (
    languageTag = 'en-US',
    uses24hourClock = false,
  ) => {
    jest
      .spyOn(Localization, 'getCalendars')
      .mockReturnValue([{ uses24hourClock } as any])

    jest
      .spyOn(Localization, 'getLocales')
      .mockReturnValue([{ languageTag } as any])
  }
  describe('formatDate function', () => {
    it('should format the param "date" to a string date based on userLocation config (en-US)', () => {
      useMockUserConfig('en-US')
      const formattedDate = formatDate(new Date('2023/08/12'))

      expect(formattedDate).toBe('08/12/2023')
    })

    it('should format the param "date" to a string date based on userLocation config (pt-BR)', () => {
      useMockUserConfig('pt-BR')
      const formattedDate = formatDate(new Date('2023/08/12'))

      expect(formattedDate).toBe('12/08/2023')
    })
  })

  describe('formatTime function', () => {
    it('should format correctly "date" return only the "hours" and "minutes" format 12h', () => {
      useMockUserConfig(undefined, false)

      const formattedTime = formatTime(
        new Date(new Date('2023/08/12').setHours(16)),
      )

      expect(formattedTime).toBe('04:00 PM')
    })
    it('should format correctly "date" return only the "hours" and "minutes" format 24h', () => {
      useMockUserConfig(undefined, true)

      const formattedTime = formatTime(
        new Date(new Date('2023/08/12').setHours(16)),
      )

      expect(formattedTime).toBe('16:00')
    })
  })

  describe('formatDateAndTime function', () => {
    it('should format date and time returning a string "en" 12h', () => {
      useMockUserConfig('en-US', false)

      const formattedTime = formatDateAndTime(
        new Date(new Date('2023/08/12').setHours(16)),
      )

      expect(formattedTime).toBe('08/12/2023 at 04:00 PM')
    })
    it('should format date and time returning a string "en" 24h', () => {
      useMockUserConfig('en-US', true)

      const formattedTime = formatDateAndTime(
        new Date(new Date('2023/08/12').setHours(16)),
      )

      expect(formattedTime).toBe('08/12/2023 at 16:00')
    })
    it('should format date and time returning a string "pt" 24h', () => {
      useMockUserConfig('pt-BR', true)

      const formattedTime = formatDateAndTime(
        new Date(new Date('2023/08/12').setHours(16)),
      )

      expect(formattedTime).toBe('12/08/2023 às 16:00')
    })

    it('should return the hours prefix default from INTL when not "en" or "pt" locale', () => {
      useMockUserConfig('fr', true)

      const formattedTime = formatDateAndTime(
        new Date(new Date('2023/08/12').setHours(16)),
      )

      expect(formattedTime).toBe('12/08/2023 16:00')
    })
  })
})
