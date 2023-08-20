import { render } from '~/utils/test-utils'

import * as React from 'react'

import { EditMeal } from '.'

import { useRoute } from '@react-navigation/native'
import { Meal } from '~/models/Meal'
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
    useNavigation: jest.fn(),
  }
})
describe('EditMeal Screen', () => {
  it('should render Correctly', () => {
    render(<EditMeal />)
  })
  // const inputNameID = 'input-name'
  // const inputDescriptionID = 'input-description'
  // const btnDate = 'btn-date'
  // const btnInDietID = 'btn-in-diet'
  // const btnOutDietID = 'btn-out-diet'
  // const dateTimePicker = 'date-time-picker'

  const mockMealInDiet: Meal = {
    date: new Date().toISOString(),
    name: 'Tapioca with fake stuffing',
    description: 'In Diet Fake Meal',
    id: 'fake-id',
    inDiet: true,
  }
  beforeEach(() => {
    jest
      .mocked(useRoute)
      .mockReturnValue({ params: { meal: mockMealInDiet } } as any)
  })
})
