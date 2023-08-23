import { getStoredDays, setStoredDays } from '../utils/storage_days'
import { deleteDayRegister } from './deleteDayRegister'
import * as StorageDays from '../utils/storage_days'
import AsyncStorage from '@react-native-async-storage/async-storage'
describe('deleteDayRegister', () => {
  const initialDate = ['2023/08/15', '2023/08/16', '2023/08/17']

  const useSpySetDays = () => jest.spyOn(StorageDays, 'setStoredDays')
  const useSpyGetDays = () => jest.spyOn(StorageDays, 'getStoredDays')

  beforeEach(async () => {
    jest.clearAllMocks()
    await AsyncStorage.clear()
  })

  it('should delete a day register correctly', async () => {
    // Prepare
    await setStoredDays(initialDate)

    const setDaysSpy = useSpySetDays()
    const getDaysSpy = useSpyGetDays()

    // Act
    await deleteDayRegister(initialDate[1])

    // Assert
    expect(setDaysSpy).toHaveBeenCalledTimes(1)
    expect(getDaysSpy).toHaveBeenCalledTimes(1)

    const newStoredDays = await getStoredDays()
    expect(newStoredDays).toEqual([initialDate[0], initialDate[2]])
  })

  it('should return when does not exist any group registered', async () => {
    const getDaysSpy = useSpyGetDays()
    const setDaysSpy = useSpySetDays()

    // Act
    expect(deleteDayRegister('2202/13/12')).resolves.not.toThrow()
    expect(getDaysSpy).toBeCalledTimes(1)
    expect(setDaysSpy).not.toBeCalled()
  })
  it('should return when does not find any group with the dateKey provided', async () => {
    // Prepare
    await setStoredDays(initialDate)
    jest.clearAllMocks()

    const getDaysSpy = useSpyGetDays()
    const setDaysSpy = useSpySetDays()

    // Act
    expect(deleteDayRegister('2202/13/12')).resolves.not.toThrow()
    expect(getDaysSpy).toBeCalledTimes(1)
    expect(setDaysSpy).not.toBeCalled()
  })
  it('should throw when dateKey is invalid type or not provided', async () => {
    expect(deleteDayRegister(undefined as any)).rejects.toThrow()
    expect(deleteDayRegister([] as any)).rejects.toThrow()
  })
})
