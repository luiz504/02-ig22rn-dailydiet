import { storageDateKeyFormat } from '../utils/storage_keys'
import { setStoredMeals } from '../utils/storage_meal'
import { getMealsByDays } from './getMealsByDays'

describe('getMealsByDays actions', () => {
  const mealsCollection = [
    {
      groupName: storageDateKeyFormat(new Date('2023/08/03')),
      data: [
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
      groupName: storageDateKeyFormat(new Date('2023/08/02')),
      data: [
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

  it('should return a list of meals related to the days provided', async () => {
    await Promise.all(
      mealsCollection.map((item) => setStoredMeals(item.groupName, item.data)),
    )
    const meals = await getMealsByDays([
      mealsCollection[0].groupName,
      mealsCollection[1].groupName,
    ])

    expect(meals).toEqual([
      { day: mealsCollection[0].groupName, meals: mealsCollection[0].data },
      { day: mealsCollection[1].groupName, meals: mealsCollection[1].data },
    ])
  })
})
