/* eslint-disable testing-library/no-unnecessary-act */
import {
  act,
  fireEvent,
  render,
  screen,
  splitBorderColor,
  waitFor,
  waitForElementToBeRemoved,
} from '~/utils/test-utils'

import * as React from 'react'

import { NewMeal } from '.'
import { theme } from '~/styles'
import { useNavigation } from '@react-navigation/native'
import { Alert, Keyboard } from 'react-native'
import { formatDate, formatTime } from '~/utils/dateTimeFormatters'
import { subDays, subHours, subMonths } from 'date-fns'
import DateTimePicker from 'react-native-modal-datetime-picker'
import RHF, { useForm } from 'react-hook-form'

import * as CreateMealModule from '~/storage/meals/createMeal'
import * as StatisticsModule from '~/storage/statistics/getStatistics'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
}))

describe('NewMeal Screen', () => {
  const useNavigationMock = () => {
    const navigate = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate } as any)
    return { navigate }
  }

  beforeEach(() => {
    jest.clearAllMocks()
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
    inDietErrorID: 'in-diet-error',
  }

  it('should navigate to home page when clicking on return button', () => {
    const { navigate } = useNavigationMock()
    render(<NewMeal />)

    const btnReturn = screen.getByTestId('btn-return')

    // Act
    fireEvent.press(btnReturn)

    // Assert
    expect(navigate).toBeCalledTimes(1)
    expect(navigate).toBeCalledWith('home')
  })

  it('should dismiss keyboard when click outside the input in the form area', () => {
    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss')

    render(<NewMeal />)

    const inputElement = screen.getByTestId(testIDs.inputNameID)
    const formElement = screen.getByTestId('form')

    // Act
    fireEvent(inputElement, 'focus')

    fireEvent(formElement, 'press')

    // Assert
    expect(keyboardSpy).toBeCalledTimes(1)
  })

  it('should be able to select between InDiet and OutDiet', async () => {
    render(<NewMeal />)

    const inDietBtn = screen.getByTestId(testIDs.btnInDietID)
    const outDietBtn = screen.getByTestId(testIDs.btnOutDietID)

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

  it('should open DateTimePicker with the mode "date" and change only the date not the time', async () => {
    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss')

    render(<NewMeal />)

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
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent(
        screen.UNSAFE_getByType(DateTimePicker),
        'onConfirm',
        subDays(new Date(), 1),
      )
      await waitFor(async () => {
        expect(screen.getByTestId(testIDs.labelDateID).props.children).toBe(
          formatDate(subDays(dateFromProps, 1)),
        )
      })
      expect(labelTime.props.children).toBe(formatTime(dateFromProps))
    })

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(testIDs.dateTimePickerID),
    )
  })
  it('should open DateTimePicker with the mode "time" and change only the time not the date', async () => {
    jest.useFakeTimers().setSystemTime(new Date().setUTCHours(12, 0, 0, 0))

    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss')

    render(<NewMeal />)

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
    // eslint-disable-next-line testing-library/no-unnecessary-act

    const newHour = subHours(dateFromProps, 3)
    await act(async () => {
      fireEvent(screen.UNSAFE_getByType(DateTimePicker), 'onConfirm', newHour)
      await waitFor(async () => {
        expect(screen.getByTestId(testIDs.labelDateID).props.children).toBe(
          formatDate(dateFromProps),
        )
      })
      expect(labelTime.props.children).toBe(formatTime(newHour))
    })

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

    render(<NewMeal />)

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
    render(<NewMeal />)

    // Check Initial
    expect(screen.queryByTestId(testIDs.nameErrorID)).toBeNull()
    expect(screen.queryByTestId(testIDs.dateErrorID)).toBeNull()
    expect(screen.queryByTestId(testIDs.inDietErrorID)).toBeNull()

    // Act
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.press(screen.getByTestId(testIDs.btnDateID))

      fireEvent(
        screen.UNSAFE_getByType(DateTimePicker),
        'onConfirm',
        subMonths(new Date(), 5),
      )

      fireEvent.press(screen.getByTestId(testIDs.btnSubmitID))
    })

    expect(screen.getByTestId(testIDs.nameErrorID).props.children).toEqual(
      'Meal name required.',
    )

    expect(screen.getByTestId(testIDs.dateErrorID).props.children).toEqual(
      expect.any(String),
    )

    expect(screen.getByTestId(testIDs.inDietErrorID).props.children).toEqual(
      'You must select a Diet type.',
    )
  })

  it('should trigger createMeal function when success navigate to success screen', async () => {
    const todayDayString = '2023/08/15'
    jest
      .useFakeTimers()
      .setSystemTime(new Date(todayDayString).setHours(12, 0, 0, 0))
    const createMealSpy = jest.spyOn(CreateMealModule, 'createMeal')
    const dispatch = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ dispatch })
    render(<NewMeal />)

    // Act Fill Form

    fireEvent.changeText(
      screen.getByTestId(testIDs.inputNameID),
      'Fake Meal Name',
    )

    fireEvent.changeText(
      screen.getByTestId(testIDs.inputDescriptionID),
      'Fake Meal Description',
    )

    fireEvent.press(screen.getByTestId(testIDs.btnDateID))

    fireEvent(
      screen.UNSAFE_getByType(DateTimePicker),
      'onConfirm',
      subDays(new Date(), 1),
    )

    fireEvent.press(screen.getByTestId(testIDs.btnInDietID))

    fireEvent.press(screen.getByTestId(testIDs.btnSubmitID))

    await waitFor(() => {
      expect(dispatch).toBeCalledTimes(1)
    })
    expect(dispatch).toBeCalledWith({
      payload: { name: 'success-meal-creation', params: { inDiet: true } },
      type: 'REPLACE',
    })

    expect(createMealSpy).toBeCalledWith({
      date: new Date('2023-08-14T12:00:00.000Z'),
      description: 'Fake Meal Description',
      inDiet: true,
      name: 'Fake Meal Name',
    })
  })
  it('should navigate to home if some error occur with getStatists after meal Creation success', async () => {
    const todayDayString = '2023/08/15'
    jest
      .useFakeTimers()
      .setSystemTime(new Date(todayDayString).setHours(12, 0, 0, 0))
    jest.spyOn(StatisticsModule, 'getStatistics').mockResolvedValue(null)
    const createMealSpy = jest.spyOn(CreateMealModule, 'createMeal')
    const dispatch = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ dispatch })
    render(<NewMeal />)

    // Act Fill Form

    fireEvent.changeText(
      screen.getByTestId(testIDs.inputNameID),
      'Fake Meal Name',
    )

    fireEvent.changeText(
      screen.getByTestId(testIDs.inputDescriptionID),
      'Fake Meal Description',
    )

    fireEvent.press(screen.getByTestId(testIDs.btnDateID))

    fireEvent(
      screen.UNSAFE_getByType(DateTimePicker),
      'onConfirm',
      subDays(new Date(), 1),
    )

    fireEvent.press(screen.getByTestId(testIDs.btnInDietID))

    fireEvent.press(screen.getByTestId(testIDs.btnSubmitID))

    await waitFor(() => {
      expect(dispatch).toBeCalledTimes(1)
    })
    expect(dispatch).toBeCalledWith({
      payload: { name: 'home', params: undefined },
      type: 'REPLACE',
    })

    expect(createMealSpy).toBeCalledWith({
      date: new Date('2023-08-14T12:00:00.000Z'),
      description: 'Fake Meal Description',
      inDiet: true,
      name: 'Fake Meal Name',
    })
  })
  it('should trigger a Alert message when some generic error occurs on handleCreateMeal', async () => {
    const todayDayString = '2023/08/15'
    jest
      .useFakeTimers()
      .setSystemTime(new Date(todayDayString).setHours(12, 0, 0, 0))
    jest
      .spyOn(CreateMealModule, 'createMeal')
      .mockRejectedValue(new Error('some generic error'))
    const AlertSpy = jest.spyOn(Alert, 'alert')

    const { navigate } = useNavigationMock()
    render(<NewMeal />)

    // Act Fill Form
    fireEvent.changeText(
      screen.getByTestId(testIDs.inputNameID),
      'Fake Meal Name',
    )

    fireEvent.changeText(
      screen.getByTestId(testIDs.inputDescriptionID),
      'Fake Meal Description',
    )

    fireEvent.press(screen.getByTestId(testIDs.btnDateID))

    fireEvent(
      screen.UNSAFE_getByType(DateTimePicker),
      'onConfirm',
      subDays(new Date(), 1),
    )

    fireEvent.press(screen.getByTestId(testIDs.btnInDietID))

    fireEvent.press(screen.getByTestId(testIDs.btnSubmitID))

    await waitFor(() => {
      expect(AlertSpy).toBeCalledWith(expect.any(String), expect.any(String))
    })

    expect(navigate).not.toBeCalled()
  })
})
