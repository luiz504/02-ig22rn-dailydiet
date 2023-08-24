import { getStoredDays } from '../utils/storage_days'
import { getStoredMealsByDays } from '../utils/storage_meal'
import { processMealStatistics } from '~/utils/processMealsStatistics'

export async function getStatistics() {
  const days = await getStoredDays()
  if (!days) return null

  const mealsCollection = await getStoredMealsByDays(days)

  return processMealStatistics(mealsCollection)
}
