import { endOfDay, subMonths } from 'date-fns'
import { z } from 'zod'

import {
  deleteStoredMealCollection,
  getStoredMealsByDay,
  setStoredMeals,
} from '../utils/storage_meal'
import { AppError } from '~/utils/AppError'
import { Meal } from '~/models/Meal'

import { deleteDayRegister } from '../days/deleteDayRegister'
import { storageDateKeyFormat } from '../utils/storage_keys'
import { createDayRegister } from '../days/createDayRegister'

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

  const hasChangedDateGroup = updatedFields.date
    ? groupName !== storageDateKeyFormat(updatedFields.date)
    : false

  if (!hasChangedDateGroup) {
    if (!updatedFields.date) {
      delete updatedFields.date
    }
    const updatedMeal = { ...storedMeal, ...(updatedFields as Partial<Meal>) }

    const updatedMeals = storedMealsByDay.meals.map((m) =>
      m.id === id ? updatedMeal : m,
    )

    await setStoredMeals(groupName, updatedMeals)
  } else {
    const updatedMeal = { ...storedMeal, ...(updatedFields as Partial<Meal>) }
    const newDate = updatedFields.date as Date
    const newGroupName = storageDateKeyFormat(newDate)

    const storedMealsCollectionAtNewDate = await getStoredMealsByDay(
      newGroupName,
    )

    const filteredPreviousMeals = storedMealsByDay.meals.filter(
      (m) => m.id !== id,
    )

    const shouldCreateNewMealCollection = !storedMealsCollectionAtNewDate
    const shouldDeletePreviousMealCollection = !filteredPreviousMeals.length

    await Promise.all([
      //* Create Day Register for new Collection and create new MealCollection
      shouldCreateNewMealCollection && createDayRegister(newDate),
      shouldCreateNewMealCollection &&
        setStoredMeals(newGroupName, [updatedMeal]),

      //! Should update existing target Meal Collection
      !shouldCreateNewMealCollection &&
        setStoredMeals(newGroupName, [
          ...storedMealsCollectionAtNewDate.meals,
          updatedMeal,
        ]),

      //* Updated Previous Collection
      !shouldDeletePreviousMealCollection &&
        setStoredMeals(groupName, filteredPreviousMeals),

      //! Delete Previous Meal Collection
      shouldDeletePreviousMealCollection &&
        deleteStoredMealCollection(groupName),
      shouldDeletePreviousMealCollection && deleteDayRegister(groupName),
    ])
  }
}
