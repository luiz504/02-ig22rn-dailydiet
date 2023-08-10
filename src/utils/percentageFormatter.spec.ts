import { percentageFormatter } from './percentageFormatter'

describe('percentage Formatter', () => {
  it('should return the percentage notation us-EN', () => {
    require('expo-localization').locale = 'en-US'

    expect(percentageFormatter(40.4)).toBe('40.40%')
    expect(percentageFormatter(50)).toBe('50%')
    expect(percentageFormatter(99.99)).toBe('99.99%')
  })
  it('should return the percentage notation pt-BR', () => {
    require('expo-localization').locale = 'pt-BR'
    expect(percentageFormatter(40.4)).toBe('40,40%')
    expect(percentageFormatter(50)).toBe('50%')
    expect(percentageFormatter(99.99)).toBe('99,99%')
  })
})
