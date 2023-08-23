import { AppError } from '~/utils/AppError'
import { storageDateKeyFormat } from '../utils/storage_keys'
import {
  MealGroupByDay,
  getStoredMealsByDay,
  setStoredMeals,
} from '../utils/storage_meal'
import { updateMeal } from './updateMeal'
import { getStoredDays, setStoredDays } from '../utils/storage_days'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addHours } from 'date-fns'

const MockedMealsCollection: MealGroupByDay[] = [
  {
    day: storageDateKeyFormat(new Date('2023/08/02')),
    meals: [
      {
        id: 'meal2',
        name: 'Dinner',
        description: '',
        date: new Date(new Date('2023/08/02').setHours(15)).toISOString(),
        inDiet: true,
      },
      {
        id: 'meal1',
        name: 'Lunch',
        description: '',
        date: new Date(new Date('2023/08/02').setHours(12)).toISOString(),
        inDiet: true,
      },
    ],
  },
  {
    day: storageDateKeyFormat(new Date('2023/08/01')),
    meals: [
      {
        id: 'meal3',
        name: 'Lunch',
        description: '',
        date: new Date(new Date('2023/08/01').setHours(16)).toISOString(),
        inDiet: true,
      },
    ],
  },
]

const MockedGroupsNames = MockedMealsCollection.flatMap((d) => d.day)
describe('updateMeal actions', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    await AsyncStorage.clear()
  })

  const seedMealCollection = async (collections: MealGroupByDay[]) => {
    const clonedCollections: MealGroupByDay[] = JSON.parse(
      JSON.stringify(collections),
    )
    await Promise.all([
      clonedCollections.map((c) => setStoredMeals(c.day, c.meals)),
    ])
  }

  it('should update the correct meal by "id" changing property "name" individually', async () => {
    // Prepare
    await seedMealCollection(MockedMealsCollection)

    const collectionTarget = MockedMealsCollection[0]
    const mealTarget = collectionTarget.meals[0]

    // Act
    const newName = 'Fake Meal Name 2'
    await updateMeal(
      { groupName: collectionTarget.day, id: mealTarget.id },
      { name: newName },
    )

    // Assert
    const expectedCollection = MockedMealsCollection[0].meals.map((item) =>
      item.id === mealTarget.id ? { ...item, name: newName } : item,
    )
    const storedDaysCollection = await getStoredMealsByDay(collectionTarget.day)

    expect(storedDaysCollection?.meals[0].name).toEqual(newName)
    expect(storedDaysCollection?.meals).toEqual(expectedCollection)
  })

  it('should update a meal property "description" individually ', async () => {
    // Prepare
    await seedMealCollection(MockedMealsCollection)
    const collectionTarget = MockedMealsCollection[0]
    const mealTarget = collectionTarget.meals[0]

    // Act
    const newDescription = 'Fake Meal description 2'
    await updateMeal(
      { groupName: collectionTarget.day, id: mealTarget.id },
      { description: newDescription },
    )

    // Asset
    const storedDaysCollection = await getStoredMealsByDay(collectionTarget.day)

    const updatedTarget = storedDaysCollection?.meals.find(
      (m) => m.id === mealTarget.id,
    )

    expect(updatedTarget?.description).toBe(newDescription)
  })

  it('should update a meal property "inDiet" individually ', async () => {
    // Prepare
    await seedMealCollection(MockedMealsCollection)
    const collectionTarget = MockedMealsCollection[0]
    const mealTarget = collectionTarget.meals[0]

    // Act
    const newInDiet = !mealTarget.inDiet
    await updateMeal(
      { groupName: collectionTarget.day, id: mealTarget.id },
      { inDiet: newInDiet },
    )

    // Asset
    const storedDaysCollection = await getStoredMealsByDay(collectionTarget.day)

    const updatedTarget = storedDaysCollection?.meals.find(
      (m) => m.id === mealTarget.id,
    )

    expect(updatedTarget?.inDiet).toBe(newInDiet)
  })

  it('should update a meal property "time" individually ', async () => {
    // Prepare
    await seedMealCollection(MockedMealsCollection)
    const collectionTarget = MockedMealsCollection[0]
    const mealTarget = collectionTarget.meals[0]

    // Act
    const newDate = new Date(addHours(new Date(mealTarget.date), 2))
    await updateMeal(
      { groupName: collectionTarget.day, id: mealTarget.id },
      { date: newDate },
    )

    // Asset
    const storedDaysCollection = await getStoredMealsByDay(collectionTarget.day)

    const updatedTarget = storedDaysCollection?.meals.find(
      (m) => m.id === mealTarget.id,
    )

    expect(updatedTarget?.date).toBe(newDate.toISOString())
  })

  it('should throw an error if the provided group does not exist', async () => {
    expect(
      updateMeal(
        { id: 'non-existent', groupName: 'ghost' },
        { name: 'typescript satisfied' },
      ),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should throw an error if the provided meal does not exists in the meals collection', async () => {
    // Prepare
    await seedMealCollection([MockedMealsCollection[0]])

    // Act and Asset
    expect(
      updateMeal(
        { id: 'non-existent', groupName: MockedMealsCollection[0].day },
        { name: 'typescript satisfied' },
      ),
    ).rejects.toBeInstanceOf(AppError)
  })

  describe('When Update Meals to a different date => remove itself from the previous mealCollection => ', () => {
    beforeEach(async () => {
      jest.useFakeTimers().setSystemTime(new Date('2023/08/02'))

      // Prepare - seeding DB
      await setStoredDays(MockedGroupsNames)

      await seedMealCollection(MockedMealsCollection)
    })
    it('should then create a new mealCollection and update the daysCollection with the new date', async () => {
      // Act
      const initialCollection = MockedMealsCollection[0]
      const meal = MockedMealsCollection[0].meals[1]
      const newDate = new Date('2023/08/03')
      await updateMeal(
        { groupName: initialCollection.day, id: meal.id },
        { date: newDate },
      )

      // Asset
      const newGroupName = storageDateKeyFormat(newDate)
      const newDaysCollection = await getStoredDays()
      const previousMealCollection = await getStoredMealsByDay(
        initialCollection.day,
      )
      const currentMealCollection = await getStoredMealsByDay(newGroupName)

      expect(newDaysCollection).toEqual([newGroupName, ...MockedGroupsNames])
      expect(previousMealCollection).toEqual({
        day: initialCollection.day,
        meals: initialCollection?.meals.filter((i) => i.id !== meal.id),
      })
      expect(currentMealCollection).toEqual({
        day: newGroupName,
        meals: [{ ...meal, date: newDate.toISOString() }],
      })
    })

    it('should concat with the existent MealCollection based and sorted by the new date', async () => {
      const initialCollection = MockedMealsCollection[0]
      const meal = initialCollection.meals[0]
      const newDate = new Date(
        new Date(MockedMealsCollection[1].day).setHours(17),
      )
      await updateMeal(
        { groupName: initialCollection.day, id: meal.id },
        { date: newDate },
      )

      // Asset
      const newGroupName = MockedMealsCollection[1].day
      const newDaysCollection = await getStoredDays()
      const previousMealCollection = await getStoredMealsByDay(
        initialCollection.day,
      )
      const currentMealCollection = await getStoredMealsByDay(newGroupName)

      expect(newDaysCollection).toEqual(MockedGroupsNames)
      expect(previousMealCollection).toEqual({
        day: initialCollection.day,
        meals: initialCollection?.meals.filter((i) => i.id !== meal.id),
      })
      expect(currentMealCollection).toEqual({
        day: newGroupName,
        meals: [
          { ...meal, date: newDate.toISOString() },
          MockedMealsCollection[1].meals[0],
        ],
      })
    })

    it('should cleanup the previous mealsCollection/DayCollection if it was the unique entry', async () => {
      const initialCollection = MockedMealsCollection[1]
      const meal = initialCollection.meals[0]
      const newDate = new Date(
        new Date(MockedMealsCollection[0].day).setHours(17),
      )
      await updateMeal(
        { groupName: initialCollection.day, id: meal.id },
        { date: newDate },
      )

      // Asset
      const newGroupName = MockedMealsCollection[0].day
      const newDaysCollection = await getStoredDays()
      const previousMealCollection = await getStoredMealsByDay(
        initialCollection.day,
      )
      const currentMealCollection = await getStoredMealsByDay(newGroupName)

      expect(newDaysCollection).toEqual([MockedGroupsNames[0]])
      expect(previousMealCollection).toBeNull()
      expect(currentMealCollection).toEqual({
        day: newGroupName,
        meals: [
          { ...meal, date: newDate.toISOString() },
          MockedMealsCollection[0].meals[0],
          MockedMealsCollection[0].meals[1],
        ],
      })
    })
  })
})
