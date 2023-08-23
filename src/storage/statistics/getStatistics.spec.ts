import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStatistics } from './getStatistics'

describe('getStatistics Action', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })
  it('should return null if there is no DayCollection entry', async () => {
    expect(getStatistics()).resolves.toBeNull()
  })
})
