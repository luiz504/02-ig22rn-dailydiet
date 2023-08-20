import { AppError } from '~/utils/AppError'
import { storageDateKeyFormat } from '../utils/storage_keys'
import { getStoredMealsByDay, setStoredMeals } from '../utils/storage_meal'
import { updateMeal } from './updateMeal'

describe('updateMeal actions', () => {
  const mealsCollection = [
    {
      groupName: storageDateKeyFormat(new Date('2023/08/02')),
      data: [
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
          date: new Date(new Date('2023/08/02').setHours(16)).toISOString(),
          inDiet: true,
        },
      ],
    },
  ]

  it('should update the correct meal by "id" changing property "name" individually', async () => {
    // Prepare
    await Promise.all(
      mealsCollection.map((item) => setStoredMeals(item.groupName, item.data)),
    )
    const collectionTarget = mealsCollection[0]
    const mealTarget = collectionTarget.data[0]

    // Act
    const newName = 'Fake Meal Name 2'
    await updateMeal(
      { groupName: collectionTarget.groupName, id: mealTarget.id },
      { name: newName },
    )

    // Asset
    const expectedCollection = mealsCollection[0].data.map((item) =>
      item.id === mealTarget.id ? { ...item, name: newName } : item,
    )
    const storedDaysCollection = await getStoredMealsByDay(
      collectionTarget.groupName,
    )

    expect(storedDaysCollection?.meals[0].name).toEqual(newName)
    expect(storedDaysCollection?.meals).toEqual(expectedCollection)
  })
  it('should update a meal property "description" individually ', async () => {
    // Prepare
    await Promise.all(
      mealsCollection.map((item) => setStoredMeals(item.groupName, item.data)),
    )
    const collectionTarget = mealsCollection[0]
    const mealTarget = collectionTarget.data[0]

    // Act
    const newDescription = 'Fake Meal description 2'
    await updateMeal(
      { groupName: collectionTarget.groupName, id: mealTarget.id },
      { description: newDescription },
    )

    // Asset
    const storedDaysCollection = await getStoredMealsByDay(
      collectionTarget.groupName,
    )

    const updatedTarget = storedDaysCollection?.meals.find(
      (m) => m.id === mealTarget.id,
    )

    expect(updatedTarget?.description).toBe(newDescription)
  })
  it('should update a meal property "inDiet" individually ', async () => {
    // Prepare
    await Promise.all(
      mealsCollection.map((item) => setStoredMeals(item.groupName, item.data)),
    )
    const collectionTarget = mealsCollection[0]
    const mealTarget = collectionTarget.data[0]

    // Act
    const newInDiet = !mealTarget.inDiet
    await updateMeal(
      { groupName: collectionTarget.groupName, id: mealTarget.id },
      { inDiet: newInDiet },
    )

    // Asset
    const storedDaysCollection = await getStoredMealsByDay(
      collectionTarget.groupName,
    )

    const updatedTarget = storedDaysCollection?.meals.find(
      (m) => m.id === mealTarget.id,
    )

    expect(updatedTarget?.inDiet).toBe(newInDiet)
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
    await setStoredMeals(mealsCollection[0].groupName, mealsCollection[0].data)

    // Act and Asset
    expect(
      updateMeal(
        { id: 'non-existent', groupName: mealsCollection[0].groupName },
        { name: 'typescript satisfied' },
      ),
    ).rejects.toBeInstanceOf(AppError)
  })
})
