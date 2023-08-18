import { getStoredMealsByDays } from '../utils/storage_meal'

export async function getMealsByDays(days: string[]) {
  const entries = await getStoredMealsByDays(days)

  return entries
}
