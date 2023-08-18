import { Statistics } from '~/models/Statistics'

import { MealGroupByDay } from '~/storage/utils/storage_meal'

export const MockMealsGrouped: MealGroupByDay[] = [
  {
    day: '2023/06/12',
    meals: [
      {
        id: 'i0',
        name: 'x-tuda0 1hhui 1hui2 12h3uih1 iu2hh13uih23h 12hh1h2uh3uh1i2h3ui1h2ui3hi',
        description:
          'Delicious 1hhui 1hui2 12h3uih1 iu2hh13uih23h 12hh1h2uh3uh1i2h3ui1h2ui3hi',
        date: new Date(2023, 5, 12, 16, 40).toISOString(),
        inDiet: true,
      },
      {
        id: 'i1',
        name: 'x-tudim',
        description: 'Delicious',
        date: new Date(2023, 5, 12, 13).toISOString(),
        inDiet: true,
      },
    ],
  },
  {
    day: '2023/06/13',
    meals: [
      {
        id: 'i0',
        name: 'x-tuda0 1hhui 1hui2 12h3uih1 iu2hh13uih23h 12hh1h2uh3uh1i2h3ui1h2ui3hi',
        description:
          'Delicious 1hhui 1hui2 12h3uih1 iu2hh13uih23h 12hh1h2uh3uh1i2h3ui1h2ui3hi',
        date: new Date(2023, 5, 13, 16, 40).toISOString(),
        inDiet: false,
      },
      {
        id: 'i1',
        name: 'x-tudim',
        description: 'Delicious',
        date: new Date(2023, 5, 13, 13).toISOString(),
        inDiet: true,
      },
    ],
  },
]
export const mockDays = ['2023/06/12', '2023/06/13']

export const mockStatistics: Statistics = {
  bestInDietSequence: 22,
  inDietEntries: 99,
  outDietEntries: 10,
  totalEntries: 99 + 10,
  inDietPercentage: (99 / (99 + 10)) * 100,
}
