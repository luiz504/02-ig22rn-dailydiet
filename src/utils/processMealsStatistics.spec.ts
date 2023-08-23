import { processMealStatistics } from './processMealsStatistics'

describe('processMealsStatistics function', () => {
  const mealsCollection = [
    {
      meals: [
        {
          id: 'meal1',
          name: 'Lunch',
          description: '',
          date: new Date(new Date('2023/08/03').setHours(16)).toISOString(),
          inDiet: true,
        },
        {
          id: 'meal2',
          name: 'Dinner',
          description: '',
          date: new Date(new Date('2023/08/03').setHours(18)).toISOString(),
          inDiet: true,
        },
      ],
    },
    {
      meals: [
        {
          id: 'meal1',
          name: 'Lunch',
          description: '',
          date: new Date(new Date('2023/08/02').setHours(16)).toISOString(),
          inDiet: true,
        },
        {
          id: 'meal2',
          name: 'Dinner',
          description: '',
          date: new Date(new Date('2023/08/02').setHours(18)).toISOString(),
          inDiet: true,
        },
      ],
    },
  ]
  it('should return the meals provided statistics', () => {
    const statistics = processMealStatistics(mealsCollection)

    expect(statistics).toEqual({
      bestInDietSequence: 4,
      inDietEntries: 4,
      inDietPercentage: 100,
      outDietEntries: 0,
      totalEntries: 4,
    })
  })
  it('should return null when there is no entries', () => {
    const statistics = processMealStatistics([])

    expect(statistics).toBeNull()
  })
  it('should return null if some error happen in the processing', () => {
    const statistics = processMealStatistics([{ meals: [null] as any }])

    expect(statistics).toBeNull()
  })
})
