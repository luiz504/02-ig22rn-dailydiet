import { Meal } from '~/models/Meal'
import { Statistics } from '~/models/Statistics'

export function processMealStatistics(entries: { meals: Meal[] }[]) {
  if (!entries.length) return null

  try {
    const { bestInDietSequence, inDietEntries, outDietEntries, totalEntries } =
      entries.reduce(
        (accumulator, cur) => {
          cur.meals.forEach((meal) => {
            if (meal.inDiet) {
              accumulator.inDietEntries += 1
              accumulator.currentSequence += 1

              accumulator.bestInDietSequence = Math.max(
                accumulator.bestInDietSequence,
                accumulator.currentSequence,
              )
            } else {
              accumulator.currentSequence = 0
              accumulator.outDietEntries += 1
            }

            accumulator.totalEntries += 1
          })
          return accumulator
        },
        {
          currentSequence: 0,
          bestInDietSequence: 0,
          inDietEntries: 0,
          outDietEntries: 0,
          totalEntries: 0,
        },
      )

    const statistics: Statistics = {
      bestInDietSequence,
      inDietEntries,
      outDietEntries,
      totalEntries,
      inDietPercentage: (inDietEntries / totalEntries) * 100,
    }
    return statistics
  } catch (err) {
    return null
  }
}
