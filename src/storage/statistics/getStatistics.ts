import { getDaysRegisters } from '../days/getDayRegisters'
import { getMealsByDays } from '../meals/getMealsByDays'

import { processMealStatistics } from '~/utils/processMealsStatistics'

export async function getStatistics() {
  try {
    const days = await getDaysRegisters()
    if (!days) return null

    const mealsCollection = await getMealsByDays(days)

    return processMealStatistics(mealsCollection)
  } catch (err) {
    return null
  }
}
