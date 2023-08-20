import { percentageFormatter } from './percentageFormatter'
import * as Localization from 'expo-localization'
describe('percentage Formatter', () => {
  it('should return the percentage notation en-US', () => {
    // default mock Location = en-US
    expect(percentageFormatter(40.4)).toBe('40.40%')
    expect(percentageFormatter(50)).toBe('50%')
    expect(percentageFormatter(99.99)).toBe('99.99%')
  })
  it('should return the percentage notation pt-BR', () => {
    jest
      .spyOn(Localization, 'getLocales')
      .mockReturnValue([{ languageTag: 'pt-BR' } as any])
    expect(percentageFormatter(40.4)).toBe('40,40%')
    expect(percentageFormatter(50)).toBe('50%')
    expect(percentageFormatter(99.99)).toBe('99,99%')
  })
})
