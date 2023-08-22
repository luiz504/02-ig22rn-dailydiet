import { AppError } from '~/utils/AppError'
import { deleteMeal } from './deleteMeal'
import { getStoredMealsByDay, setStoredMeals } from '../utils/storage_meal'
import { Meal } from '~/models/Meal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStoredDays, setStoredDays } from '../utils/storage_days'

describe('deleteMeal Action', () => {
  const mockCollection = {
    groupName: '2023/08/22',
    meals: [
      {
        id: 'fakeID1',
        name: 'fake Name',
        date: new Date().toISOString(),
        description: 'fake description',
        inDiet: true,
      },
      {
        id: 'fakeID2',
        name: 'fake Name2',
        date: new Date().toISOString(),
        description: 'fake description 2',
        inDiet: false,
      },
    ] as Meal[],
  }

  beforeEach(async () => {
    jest.clearAllMocks()
    await AsyncStorage.clear()
  })
  it('should throw when passing invalid parameters', () => {
    expect(deleteMeal({} as any)).rejects.toThrow()
    expect(
      deleteMeal({ mealId: null, groupName: null } as any),
    ).rejects.toThrow()
    expect(deleteMeal({ groupName: [], mealId: [] } as any)).rejects.toThrow()

    expect(deleteMeal({ groupName: '', mealId: '' } as any)).rejects.toThrow()
  })

  it('should throw when provided "groupName" collection does not exists', () => {
    expect(
      deleteMeal({ groupName: 'Ghost', mealId: 'typescript satisfaction' }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should throw when provided "mealId" does not exists in collection', async () => {
    await setStoredMeals(mockCollection.groupName, mockCollection.meals)

    expect(
      deleteMeal({
        groupName: mockCollection.groupName,
        mealId: 'inexistent id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete the meal and keep the collection if still exists more meals', async () => {
    await setStoredMeals(mockCollection.groupName, mockCollection.meals)
    const initialMeals = mockCollection.meals

    await deleteMeal({
      groupName: mockCollection.groupName,
      mealId: initialMeals[0].id,
    })

    // Asset
    const storedMeal = await getStoredMealsByDay(mockCollection.groupName)
    expect(storedMeal?.meals).toEqual([initialMeals[1]])
  })

  it('should delete the meal and keep the collection if still exists more meals', async () => {
    const initialStoredDays = [mockCollection.groupName, '2022/10/15']
    await setStoredDays(initialStoredDays)
    await setStoredMeals(mockCollection.groupName, [mockCollection.meals[0]])
    const initialMeals = mockCollection.meals

    await deleteMeal({
      groupName: mockCollection.groupName,
      mealId: initialMeals[0].id,
    })

    // Asset
    const storedMeal = await getStoredMealsByDay(mockCollection.groupName)
    const storedDays = await getStoredDays()
    expect(storedMeal).toBeNull()
    expect(storedDays).toEqual([initialStoredDays[1]])
  })
})
