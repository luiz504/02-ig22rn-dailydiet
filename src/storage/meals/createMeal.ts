import { endOfDay, subMonths } from 'date-fns'
import { z } from 'zod'
import { createDayRegister } from '../days/createDayRegister'
import { Meal } from '~/models/Meal'

import * as Crypto from 'expo-crypto'

import { getStoredMealsByDay, setStoredMeals } from '../utils/storage_meal'
import { storageDateKeyFormat } from '../utils/storage_keys'

const createMealDTOSchema = z.object({
  name: z.string().nonempty(),
  description: z.string(),
  inDiet: z.boolean(),
  date: z.date().min(subMonths(new Date(), 1)).max(endOfDay(new Date())),
})

type CreateMealDTO = z.infer<typeof createMealDTOSchema>
export async function createMeal(params: CreateMealDTO) {
  createMealDTOSchema.parse(params)
  const { name, date, description, inDiet } = params

  const key = storageDateKeyFormat(date)

  const storedMeals = await getStoredMealsByDay(key)

  const newMeal: Meal = {
    id: Crypto.randomUUID(),
    name,
    description,
    date: date.toISOString(),
    inDiet,
  }

  if (!storedMeals) {
    await Promise.all([createDayRegister(date), setStoredMeals(key, [newMeal])])
    return
  }

  await setStoredMeals(key, [...storedMeals.meals, newMeal])
}
