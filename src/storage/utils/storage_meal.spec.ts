import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStoredMealsByDays, setStoredMeals } from './storage_meal'
import { MEAL_COLLECTION } from '../commons'
import { storageDateKeyFormat } from './storage_keys'

describe('storage_meal utils functions', () => {
  const mealsCollection = [
    {
      day: storageDateKeyFormat(new Date('2023/08/03')),
      meals: [
        {
          id: 'meal1',
          name: 'Lunch',
          description: '',
          date: new Date(new Date('2023/08/03').setHours(16)).toISOString(),
          inDiet: true,
        },
        {
          id: 'meal2',
          name: 'Dinner',
          description: '',
          date: new Date(new Date('2023/08/03').setHours(18)).toISOString(),
          inDiet: true,
        },
      ],
    },
    {
      day: storageDateKeyFormat(new Date('2023/08/02')),
      meals: [
        {
          id: 'meal1',
          name: 'Lunch',
          description: '',
          date: new Date(new Date('2023/08/02').setHours(16)).toISOString(),
          inDiet: true,
        },
        {
          id: 'meal2',
          name: 'Dinner',
          description: '',
          date: new Date(new Date('2023/08/02').setHours(18)).toISOString(),
          inDiet: true,
        },
      ],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should return the stored value based on the entry keys', async () => {
    const multiGet = jest.spyOn(AsyncStorage, 'multiGet')
    const keys = ['2022/08/12', '2022/08/13']

    // Act
    const entries = await getStoredMealsByDays(keys)

    expect(multiGet).toBeCalledTimes(1)
    expect(multiGet).toBeCalledWith(
      keys.map((key) => `${MEAL_COLLECTION}-${key}`),
    )

    expect(entries).toEqual([])
  })

  it('should return the stored value based on the entry keys', async () => {
    await Promise.all(
      mealsCollection.map((item) => setStoredMeals(item.day, item.meals)),
    )

    const multiGet = jest.spyOn(AsyncStorage, 'multiGet')
    const keys = mealsCollection.map((item) => item.day)

    // Act
    const entries = await getStoredMealsByDays(keys)

    expect(multiGet).toBeCalledTimes(1)
    expect(multiGet).toBeCalledWith(
      keys.map((key) => `${MEAL_COLLECTION}-${key}`),
    )

    expect(entries).toEqual(mealsCollection)
  })
})
