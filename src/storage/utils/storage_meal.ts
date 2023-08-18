import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEAL_COLLECTION } from '../commons'
import { Meal } from '~/models/Meal'

export async function getStoredMeals(key: string) {
  return AsyncStorage.getItem(`${MEAL_COLLECTION}-${key}`).then((storedData) =>
    storedData ? (JSON.parse(storedData) as Meal[]) : null,
  )
}

export async function setStoredMeals(key: string, mealsCollection: Meal[]) {
  const sortedMealsByHour = mealsCollection.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  return AsyncStorage.setItem(
    `${MEAL_COLLECTION}-${key}`,
    JSON.stringify(sortedMealsByHour),
  )
}

export async function getManyStoredMealsByDay(keys: string[]) {
  const keysCombined = keys.map((k) => `${MEAL_COLLECTION}-${k}`)
  return AsyncStorage.multiGet(keysCombined)
}
