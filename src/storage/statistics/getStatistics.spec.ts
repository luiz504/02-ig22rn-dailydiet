import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStatistics } from './getStatistics'
import * as DayModule from '../days/getDayRegisters'
describe('getStatistics Action', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })
  it('should return null if there is no DayCollection entry', async () => {
    expect(getStatistics()).resolves.toBeNull()
  })
  it('should return null if happens any internal error', async () => {
    jest.spyOn(DayModule, 'getDaysRegisters').mockRejectedValue(null)
    expect(getStatistics()).resolves.toBeNull()
  })
})
