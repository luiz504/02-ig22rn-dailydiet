/* eslint-disable testing-library/no-unnecessary-act */
import {
  fireEvent,
  render,
  screen,
  splitBorderColor,
  waitFor,
  waitForElementToBeRemoved,
} from '~/utils/test-utils'

import * as React from 'react'

import { EditMeal } from '.'
import { theme } from '~/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, Keyboard } from 'react-native'
import { formatDate, formatTime } from '~/utils/dateTimeFormatters'
import { addMonths, subDays, subHours } from 'date-fns'
import DateTimePicker from 'react-native-modal-datetime-picker'
import RHF, { useForm } from 'react-hook-form'

import * as UpdateMealModule from '~/storage/meals/updateMeal'
import { Meal } from '~/models/Meal'
import { setStoredMeals } from '~/storage/utils/storage_meal'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
  }
})
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
}))

describe('EditMeal Screen', () => {
  const useNavigationMock = () => {
    const navigate = jest.fn()
    const goBack = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate, goBack } as any)
    return { navigate, goBack }
  }

  const initialMeal = {
    groupName: '2022/12/15',
    meal: {
      id: 'fake Meal',
      name: 'Fake meal name',
      description: 'Fake meal description',
      date: new Date(
        new Date('2022/12/15').setUTCHours(12, 0, 0, 0),
      ).toISOString(),
      inDiet: true,
    } as Meal,
  }

  beforeEach(() => {
    jest.clearAllMocks()

    jest.mocked(useRoute).mockReturnValue({
      params: { meal: initialMeal.meal, groupName: initialMeal.groupName },
    } as any)
  })

  const testIDs = {
    inputNameID: 'input-name',
    inputDescriptionID: 'input-description',
    btnDateID: 'btn-date',
    labelDateID: 'label-date',
    btnTimeID: 'btn-time',
    labelTimeID: 'label-time',
    btnInDietID: 'btn-in-diet',
    btnOutDietID: 'btn-out-diet',
    dateTimePickerID: 'date-time-picker',
    btnSubmitID: 'btn-submit',
    nameErrorID: 'name-error',
    dateErrorID: 'date-error',
  }

  it('should navigate to meal page when clicking on return button', () => {
    const { goBack } = useNavigationMock()
    render(<EditMeal />)

    const btnReturn = screen.getByTestId('btn-return')

    // Act
    fireEvent.press(btnReturn)

    // Assert
    expect(goBack).toBeCalledTimes(1)
  })

  it('should render correctly the initial Data', () => {
    render(<EditMeal />)
    const { meal } = initialMeal

    expect(screen.getByTestId(testIDs.inputNameID).props.defaultValue).toBe(
      meal.name,
    )
    expect(
      screen.getByTestId(testIDs.inputDescriptionID).props.defaultValue,
    ).toBe(meal.description)
    expect(screen.getByTestId(testIDs.labelDateID)).toHaveTextContent(
      '12/15/2022',
    )

    expect(screen.getByTestId(testIDs.labelTimeID)).toHaveTextContent('12:00')

    // Selected
    expect(screen.getByTestId(testIDs.btnInDietID)).toHaveStyle({
      ...splitBorderColor(theme.colors['green-900']),
    })
    // NotSelected
    expect(screen.getByTestId(testIDs.btnOutDietID)).toHaveStyle({
      ...splitBorderColor(theme.colors['gray-200']),
    })
  })

  it('should dismiss keyboard when click outside the input in the form area', () => {
    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss')

    render(<EditMeal />)

    const inputElement = screen.getByTestId(testIDs.inputNameID)
    const formElement = screen.getByTestId('form')

    // Act
    fireEvent(inputElement, 'focus')

    fireEvent(formElement, 'press')

    // Assert
    expect(keyboardSpy).toBeCalledTimes(1)
  })

  it('should be able to select between InDiet and OutDiet', async () => {
    render(<EditMeal />)

    const inDietBtn = screen.getByTestId(testIDs.btnInDietID)
    const outDietBtn = screen.getByTestId(testIDs.btnOutDietID)

    // Asset Initial Value (inDiet)
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

    // Act select In Diet
    fireEvent.press(inDietBtn)

    expect(inDietBtn).toHaveStyle({
      ...splitBorderColor(theme.colors['green-900']),
    })
    expect(outDietBtn).toHaveStyle({
      ...splitBorderColor(theme.colors['gray-200']),
    })
  })

  it('should open DateTimePicker with the mode "date" and change only the date not the time', async () => {
    const meal = {
      ...initialMeal.meal,
      date: new Date(new Date().setUTCHours(12, 0, 0, 0)).toISOString(),
    }
    jest.mocked(useRoute).mockReturnValue({
      params: {
        meal,
        groupName: initialMeal.groupName,
      },
    } as any)
    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss')

    render(<EditMeal />)

    const btnDate = screen.getByTestId(testIDs.btnDateID)
    const labelDate = screen.getByTestId(testIDs.labelDateID)
    const labelTime = screen.getByTestId(testIDs.labelTimeID)

    // Act
    fireEvent.press(btnDate)

    // Assert
    const datePickerComponent = screen.getByTestId(testIDs.dateTimePickerID)

    expect(datePickerComponent.props.mode).toBe('date')
    expect(keyboardSpy).toBeCalledTimes(1)

    const dateFromProps = new Date(datePickerComponent.props.date)

    expect(labelDate.props.children).toBe(formatDate(dateFromProps))
    expect(labelTime.props.children).toBe(formatTime(dateFromProps))

    // Act
    const newDate = subDays(new Date(meal.date), 1)

    fireEvent(screen.UNSAFE_getByType(DateTimePicker), 'onConfirm', newDate)

    await waitFor(async () => {
      expect(screen.getByTestId(testIDs.labelDateID).props.children).toBe(
        formatDate(newDate),
      )
    })

    expect(labelTime.props.children).toBe(formatTime(dateFromProps))

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(testIDs.dateTimePickerID),
    )
  })

  it('should open DateTimePicker with the mode "time" and change only the time not the date', async () => {
    const meal = {
      ...initialMeal.meal,
      date: new Date(new Date().setUTCHours(12, 0, 0, 0)).toISOString(),
    }

    jest.mocked(useRoute).mockReturnValue({
      params: {
        meal,
        groupName: initialMeal.groupName,
      },
    } as any)

    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss')

    render(<EditMeal />)

    const btnTime = screen.getByTestId(testIDs.btnTimeID)
    const labelDate = screen.getByTestId(testIDs.labelDateID)
    const labelTime = screen.getByTestId(testIDs.labelTimeID)

    // Act
    fireEvent.press(btnTime)

    // Assert
    const datePickerComponent = screen.getByTestId(testIDs.dateTimePickerID)

    expect(datePickerComponent.props.mode).toBe('time')
    expect(keyboardSpy).toBeCalledTimes(1)

    const dateFromProps = new Date(datePickerComponent.props.date)

    expect(labelDate.props.children).toBe(formatDate(dateFromProps))
    expect(labelTime.props.children).toBe(formatTime(dateFromProps))

    // Act

    const newTime = subHours(new Date(dateFromProps), 3)
    fireEvent(screen.UNSAFE_getByType(DateTimePicker), 'onConfirm', newTime)

    // Assert
    await waitFor(async () => {
      expect(screen.getByTestId(testIDs.labelDateID).props.children).toBe(
        formatDate(dateFromProps),
      )
    })

    expect(labelTime.props.children).toBe(formatTime(newTime))

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(testIDs.dateTimePickerID),
    )
  })

  it('Should setFocus to the description input "Description" when submitting from input "Name"', async () => {
    const setFocusMock = jest.fn()
    const mockUseForm = jest.fn(() => {
      const hook = useForm()
      return {
        ...hook,
        setFocus: setFocusMock,
      } as ReturnType<typeof useForm>
    })
    const userFormMock = jest
      .spyOn(RHF, 'useForm')
      .mockImplementation(mockUseForm)

    render(<EditMeal />)

    const nameInput = screen.getByTestId(testIDs.inputNameID, { exact: false })
    expect(screen.getByTestId(testIDs.inputDescriptionID)).toBeVisible()

    // Act
    fireEvent(nameInput, 'focus')
    fireEvent(nameInput, 'onSubmitEditing')

    // Assert
    expect(setFocusMock).toBeCalledTimes(1)
    expect(setFocusMock).toBeCalledWith('description')

    userFormMock.mockRestore()
  })

  it('should set errors messages for fields "name", "date" and "dietStatus" when not filled correctly', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023/08/15'))
    render(<EditMeal />)

    // Check Initial
    expect(screen.queryByTestId(testIDs.nameErrorID)).toBeNull()
    expect(screen.queryByTestId(testIDs.dateErrorID)).toBeNull()

    // Act
    fireEvent.changeText(screen.getByTestId(testIDs.inputNameID), '')
    fireEvent.press(screen.getByTestId(testIDs.btnDateID))

    fireEvent(
      screen.UNSAFE_getByType(DateTimePicker),
      'onConfirm',
      addMonths(new Date(), 5),
    )

    fireEvent.press(screen.getByTestId(testIDs.btnSubmitID))

    await waitFor(() =>
      expect(screen.getByTestId(testIDs.nameErrorID).props.children).toEqual(
        'Meal name required.',
      ),
    )

    expect(screen.getByTestId(testIDs.dateErrorID).props.children).toEqual(
      expect.any(String),
    )
  })

  it('should trigger createMeal function when success navigate to home screen', async () => {
    // Prepare
    await setStoredMeals(initialMeal.groupName, [initialMeal.meal])

    const todayDayString = '2023/08/15'
    jest
      .useFakeTimers()
      .setSystemTime(new Date(todayDayString).setHours(12, 0, 0, 0))
    const updateMealSpy = jest.spyOn(UpdateMealModule, 'updateMeal')

    const { navigate } = useNavigationMock()
    render(<EditMeal />)

    // Act
    const newName = 'Updated Name'
    fireEvent.changeText(screen.getByTestId(testIDs.inputNameID), newName)

    fireEvent.press(screen.getByTestId(testIDs.btnSubmitID))

    await waitFor(() => expect(navigate).toBeCalledTimes(1))
    expect(navigate).toBeCalledWith('meal', {
      meal: { ...initialMeal.meal, name: newName },
      groupName: initialMeal.groupName,
    })

    expect(updateMealSpy).toBeCalledWith(
      { id: initialMeal.meal.id, groupName: initialMeal.groupName },
      {
        name: newName,
      },
    )
  })

  it('should trigger a Alert message when some generic error occurs on handleCreateMeal', async () => {
    const todayDayString = '2023/08/15'
    jest
      .useFakeTimers()
      .setSystemTime(new Date(todayDayString).setHours(12, 0, 0, 0))
    jest
      .spyOn(UpdateMealModule, 'updateMeal')
      .mockRejectedValue(new Error('some generic error'))
    const AlertSpy = jest.spyOn(Alert, 'alert')

    const { navigate } = useNavigationMock()
    render(<EditMeal />)

    // Act Change Form
    fireEvent.changeText(
      screen.getByTestId(testIDs.inputNameID),
      initialMeal.meal.name + 'updated',
    )

    fireEvent.press(screen.getByTestId(testIDs.btnSubmitID))

    await waitFor(() => {
      expect(AlertSpy).toBeCalledWith(expect.any(String), expect.any(String))
    })

    expect(navigate).not.toBeCalled()
  })

  it('should redirect to meal page if no changes were made and submitted', async () => {
    const { navigate } = useNavigationMock()
    render(<EditMeal />)

    fireEvent.press(screen.getByTestId(testIDs.btnSubmitID))

    await waitFor(() =>
      expect(navigate).toBeCalledWith('meal', {
        meal: initialMeal.meal,
        groupName: initialMeal.groupName,
      }),
    )
  })
})
