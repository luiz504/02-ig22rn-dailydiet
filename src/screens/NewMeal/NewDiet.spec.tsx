import { fireEvent, render, screen, splitBorderColor } from '~/utils/test-utils'

import * as React from 'react'

import { NewMeal } from '.'
import { theme } from '~/styles'

describe('NewMeal Screen', () => {
  it('should render Correctly', () => {
    render(<NewMeal />)
  })
  // const inputNameID = 'input-name'
  // const inputDescriptionID = 'input-description'
  // const btnDate = 'btn-date'
  const btnInDietID = 'btn-in-diet'
  const btnOutDietID = 'btn-out-diet'
  // const dateTimePicker = 'date-time-picker'

  it('should be able to select between InDiet and OutDiet', async () => {
    render(<NewMeal />)

    const inDietBtn = screen.getByTestId(btnInDietID)
    const outDietBtn = screen.getByTestId(btnOutDietID)

    // Asset Initial Value
    expect(inDietBtn).toHaveStyle({
      ...splitBorderColor(theme.colors['gray-200']),
    })
    expect(outDietBtn).toHaveStyle({
      ...splitBorderColor(theme.colors['gray-200']),
    })

    // Act select In Diet

    fireEvent.press(inDietBtn)

    expect(inDietBtn).toHaveStyle({
      ...splitBorderColor(theme.colors['green-900']),
    })
    expect(outDietBtn).toHaveStyle({
      ...splitBorderColor(theme.colors['gray-200']),
    })

    // Act select Out Diet

    fireEvent.press(outDietBtn)

    expect(outDietBtn).toHaveStyle({
      ...splitBorderColor(theme.colors['red-900']),
    })

    expect(inDietBtn).toHaveStyle({
      ...splitBorderColor(theme.colors['gray-200']),
    })
  })

  // it('should be able to pick a Date and Hour', () => {})
  // it('should blur inputs when open DatePicker', async () => {
  //   render(<NewMeal />)

  //   const nameInput = screen.getByTestId(inputNameID)
  //   const descriptionInput = screen.getByTestId(inputDescriptionID)
  //   const dateButton = screen.getByTestId(btnDate)

  //   // Initial
  //   expect(nameInput).toHaveProp('isFocused', false)
  //   expect(descriptionInput).toHaveProp('isFocused', false)

  //   // Act with name Input
  //   fireEvent(nameInput, 'focus')
  //   expect(nameInput).toHaveProp('isFocused', true)

  //   // Act Blur
  //   act(() => {
  //     fireEvent.press(dateButton)
  //   })

  //   await waitFor(async () => {
  //     await new Promise((resolve, reject) => setTimeout(resolve, 500))
  //   })
  //   console.log('12312', screen.getByTestId(inputNameID))
  // })
})
