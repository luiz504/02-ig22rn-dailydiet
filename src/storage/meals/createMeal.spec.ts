import { Meal } from '~/models/Meal'
import { createMeal } from './createMeal'
import { storageDateKeyFormat } from '../utils/storage_keys'

import { getStoredMealsByDay, setStoredMeals } from '../utils/storage_meal'
import * as Crypto from 'expo-crypto'

describe('createMeal action', () => {
  // it('should throw an error when passing wrong parameters', () => {

  // })

  const meals: Meal[] = [
    {
      id: '123',
      name: 'meals1',
      description: '',
      date: new Date(new Date().setHours(16)).toISOString(),
      inDiet: true,
    },
    {
      id: '13',
      name: 'meals2',
      description: '',
      date: new Date(new Date().setHours(18)).toISOString(),
      inDiet: true,
    },
  ]

  it('should be able to create the first meal of a day', async () => {
    jest.spyOn(Crypto, 'randomUUID').mockReturnValue('id')
    const newMealData = {
      date: new Date(),
      name: meals[0].name,
      description: '',
      inDiet: true,
    }

    await createMeal(newMealData)

    const key = storageDateKeyFormat(new Date())

    const newStoredMeal = await getStoredMealsByDay(key)

    expect(newStoredMeal?.meals).toEqual([
      { ...newMealData, id: 'id', date: newMealData.date.toISOString() },
    ])
    expect(newStoredMeal?.day).toBe(key)
  })
  it('should be able to create the a new meal and increment previous records from the day and sorting it by hour desc', async () => {
    jest.spyOn(Crypto, 'randomUUID').mockReturnValue('id')
    const key = storageDateKeyFormat(new Date())
    setStoredMeals(key, [...meals])

    const newMealData = {
      date: new Date(new Date().setHours(17)),
      name: meals[0].name,
      description: '',
      inDiet: true,
    }

    // Act
    await createMeal(newMealData)

    const newStoredMeal = await getStoredMealsByDay(key)

    expect(newStoredMeal?.meals).toEqual([
      meals[1],
      { ...newMealData, id: 'id', date: newMealData.date.toISOString() },
      meals[0],
    ])
    expect(newStoredMeal?.day).toBe(key)
  })
})
