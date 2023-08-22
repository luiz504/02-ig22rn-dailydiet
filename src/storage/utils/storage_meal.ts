import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEAL_COLLECTION } from '../commons'
import { Meal } from '~/models/Meal'

export type MealGroupByDay = {
  day: string
  meals: Meal[]
}

export async function getStoredMealsByDay(key: string) {
  return AsyncStorage.getItem(`${MEAL_COLLECTION}-${key}`).then((storedData) =>
    storedData ? (JSON.parse(storedData) as MealGroupByDay) : null,
  )
}

export async function setStoredMeals(key: string, meals: Meal[]) {
  const sortedMealsByHour = meals.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  const mealsCollection: MealGroupByDay = { day: key, meals: sortedMealsByHour }

  return AsyncStorage.setItem(
    `${MEAL_COLLECTION}-${key}`,
    JSON.stringify(mealsCollection),
  )
}

export async function getStoredMealsByDays(keys: string[]) {
  const keysCombined = keys.map((k) => `${MEAL_COLLECTION}-${k}`)
  const entries = await AsyncStorage.multiGet(keysCombined)
  return entries
    .map(([, value]) => (value ? JSON.parse(value) : null))
    .filter((value) => value) as MealGroupByDay[]
}

export async function deleteStoredMealCollection(key: string) {
  return AsyncStorage.removeItem(`${MEAL_COLLECTION}-${key}`)
}
