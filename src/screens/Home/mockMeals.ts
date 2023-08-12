import { Statistics } from '~/models/Statistics'
import { DailyMeals } from './types'

export const mockMeals: DailyMeals = {
  '12.08.22': [
    {
      id: 'i0',
      name: 'x-tuda0 1hhui 1hui2 12h3uih1 iu2hh13uih23h 12hh1h2uh3uh1i2h3ui1h2ui3hi',
      description:
        'Delicious 1hhui 1hui2 12h3uih1 iu2hh13uih23h 12hh1h2uh3uh1i2h3ui1h2ui3hi',
      date: new Date().toISOString(),
      inDiet: false,
    },
    {
      id: 'i1',
      name: 'x-tudim',
      description: 'Delicious',
      date: new Date().toISOString(),
      inDiet: false,
    },
    {
      id: 'i2',
      name: 'salad',
      description: '500g mix tropical salad',
      date: new Date().toISOString(),
      inDiet: true,
    },
  ],
  '13.08.22': [
    {
      id: 'i3',
      name: 'x-tudim',
      description: 'Delicious',
      date: new Date().toISOString(),
      inDiet: false,
    },
    {
      id: 'i4',
      name: 'salad',
      description: '500g mix tropical salad',
      date: new Date().toISOString(),
      inDiet: true,
    },
  ],
  '13.08.20': [
    {
      id: 'i3',
      name: 'x-tudim',
      description: 'Delicious',
      date: new Date().toISOString(),
      inDiet: false,
    },
    {
      id: 'i4',
      name: 'salad',
      description: '500g mix tropical salad',
      date: new Date().toISOString(),
      inDiet: true,
    },
  ],
  '13.08.21': [
    {
      id: 'i3',
      name: 'x-tudim',
      description: 'Delicious',
      date: new Date().toISOString(),
      inDiet: false,
    },
    {
      id: 'i4',
      name: 'salad',
      description: '500g mix tropical salad',
      date: new Date().toISOString(),
      inDiet: true,
    },
  ],
  '13.08.25': [
    {
      id: 'i3',
      name: 'x-tudim',
      description: 'Delicious',
      date: new Date().toISOString(),
      inDiet: false,
    },
    {
      id: 'i4',
      name: 'salad',
      description: '500g mix tropical salad',
      date: new Date().toISOString(),
      inDiet: true,
    },
  ],
  '13.08.23': [
    {
      id: 'i3',
      name: 'x-tudim',
      description: 'Delicious',
      date: new Date().toISOString(),
      inDiet: false,
    },
    {
      id: 'i4',
      name: 'salad',
      description: '500g mix tropical salad',
      date: new Date().toISOString(),
      inDiet: true,
    },
  ],
}

export const mockStatistics: Statistics = {
  bestInDietSequence: 22,
  inDietEntries: 99,
  outDietEntries: 10,
  totalEntries: 99 + 10,
  inDietPercentage: (99 / (99 + 10)) * 100,
}
