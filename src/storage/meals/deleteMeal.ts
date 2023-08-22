import { z } from 'zod'

import {
  deleteStoredMealCollection,
  getStoredMealsByDay,
  setStoredMeals,
} from '../utils/storage_meal'
import { AppError } from '~/utils/AppError'
import { deleteDayRegister } from '../days/deleteDayRegister'

const deleteMealDTOSchema = z.object({
  groupName: z.string().nonempty(),
  mealId: z.string().nonempty(),
})

type DeleteMealDTO = z.infer<typeof deleteMealDTOSchema>

export async function deleteMeal(params: DeleteMealDTO) {
  deleteMealDTOSchema.parse(params)
  const { groupName, mealId } = params

  const storedMealCollection = await getStoredMealsByDay(groupName)

  if (!storedMealCollection) {
    throw new AppError('No Meals collection found linked to group ' + groupName)
  }

  const updatedMeals = storedMealCollection.meals.filter(
    (item) => item.id !== mealId,
  )

  if (updatedMeals.length === storedMealCollection.meals.length) {
    throw new AppError('Meal not found in group ' + groupName)
  }

  if (updatedMeals.length) {
    await setStoredMeals(groupName, updatedMeals)
  } else {
    await Promise.all([
      deleteDayRegister(groupName),
      deleteStoredMealCollection(groupName),
    ])
  }
}
