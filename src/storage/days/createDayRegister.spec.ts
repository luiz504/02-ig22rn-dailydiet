import { addDays, subDays, subMonths } from 'date-fns'
import { createDayRegister } from './createDayRegister'

import { storageDateKeyFormat } from '../utils/storage_keys'

import { getStoredDays, setStoredDays } from '../utils/storage_days'
import AsyncStorage from '@react-native-async-storage/async-storage'

describe('createGroup action', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    await AsyncStorage.clear()
  })
  it('should throw an error when passing wrong date format or not following the constrains', async () => {
    expect(createDayRegister(undefined as any)).rejects.toThrow()

    // more than 1 month past
    expect(
      createDayRegister(subDays(subMonths(new Date(), 1), 1)),
    ).rejects.toThrow()

    // Future date & time limited to today
    expect(createDayRegister(addDays(new Date(), 1))).rejects.toThrow()
  })

  it('should create a new day entry in the DAY_COLLECTION when it is empty or doest exists', async () => {
    const now = new Date()
    const formattedNowDate = storageDateKeyFormat(now)

    // Act
    await createDayRegister(now)

    const storedDay = await getStoredDays()

    // Assert
    expect(storedDay).toEqual([formattedNowDate])
  })

  it('should create a new day entry in the DAY_COLLECTION when it already Populated sorting by date', async () => {
    const initialStoredData = ['2023/08/16', '2023/08/10', '2023/08/12']

    await setStoredDays(initialStoredData)

    const now = new Date()
    const formattedNowDate = storageDateKeyFormat(now)

    // Act
    await createDayRegister(now)

    const storedDay = await getStoredDays()

    // Assert
    expect(storedDay).toEqual([
      formattedNowDate,
      initialStoredData[0],
      initialStoredData[2],
      initialStoredData[1],
    ])

    // Restore the original function
  })

  it('should not create new entry and return undefined when the date is already created', async () => {
    const now = new Date()
    const formattedNewDate = storageDateKeyFormat(now)
    const initialStoredData = [formattedNewDate]
    await setStoredDays(initialStoredData)
    jest.clearAllMocks()
    const setItemSpy = jest.spyOn(AsyncStorage, 'setItem')

    // Act
    await createDayRegister(now)

    const storedDay = await getStoredDays()

    // Assert
    expect(setItemSpy).not.toHaveBeenCalled()
    expect(storedDay).toEqual(initialStoredData)
  })
})
