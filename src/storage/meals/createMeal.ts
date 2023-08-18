import { endOfDay, subMonths } from 'date-fns'
import { z } from 'zod'
import { createDay } from '../days/createGroup'
import { Meal } from '~/models/Meal'

import * as Crypto from 'expo-crypto'

import { getStoredMeals, setStoredMeals } from '../utils/storage_meal'
import { storageDateKeyFormat } from '../utils/storageDateKeyFormat'

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

  const storedMeals = await getStoredMeals(key)

  const newMeal: Meal = {
    id: Crypto.randomUUID(),
    name,
    description,
    date: date.toISOString(),
    inDiet,
  }

  if (!storedMeals) {
    await Promise.all([createDay(date), setStoredMeals(key, [newMeal])])
    return
  }
  await setStoredMeals(key, [...storedMeals, newMeal])

  // createDay(date)
}
