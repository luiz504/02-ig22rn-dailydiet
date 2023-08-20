import { endOfDay, subMonths } from 'date-fns'
import { z } from 'zod'

import { getStoredMealsByDay, setStoredMeals } from '../utils/storage_meal'
import { AppError } from '~/utils/AppError'
import { Meal } from '~/models/Meal'

const identifierSchema = z.object({
  id: z.string({ required_error: 'Meal Id is required' }).nonempty(),
  groupName: z.string({ required_error: 'group Identifier' }).nonempty(),
})

type Identifiers = z.infer<typeof identifierSchema>

const updateMealDTOSchema = z.object({
  name: z.string().nonempty().optional(),
  description: z.string().optional(),
  inDiet: z.boolean().optional(),
  date: z
    .date()
    .min(subMonths(new Date(), 1))
    .max(endOfDay(new Date()))
    .optional(),
})

type MealUpdatable = z.infer<typeof updateMealDTOSchema>
export async function updateMeal(
  identifiers: Identifiers,
  updatedFields: MealUpdatable,
) {
  identifierSchema.parse(identifiers)
  updateMealDTOSchema.parse(updatedFields)

  const { id, groupName } = identifiers

  const storedMealsByDay = await getStoredMealsByDay(groupName)

  if (!storedMealsByDay) {
    throw new AppError(
      'Not Found any the meals collection for the group' + groupName,
    )
  }

  const storedMeal = storedMealsByDay.meals.find((m) => m.id === id)

  if (!storedMeal) {
    throw new AppError(
      `Not Found any Meal register with the provided id in the group ${groupName} collection`,
    )
  }

  if (!updatedFields.date) {
    delete updatedFields.date
    const updatedMeal = { ...storedMeal, ...(updatedFields as Partial<Meal>) }

    const updatedMeals = storedMealsByDay.meals.map((m) =>
      m.id === id ? updatedMeal : m,
    )

    await setStoredMeals(groupName, updatedMeals)
  } else {
    // const hasMoreMealsInThisGroup = storedMealsByDay.meals.length > 1
    // coming soon first do the deletes
  }
}
