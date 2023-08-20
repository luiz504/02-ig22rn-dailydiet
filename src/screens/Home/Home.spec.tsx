import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '~/utils/test-utils'
import { Home } from '.'
import { useNavigation } from '@react-navigation/native'
import * as daysStorageActions from '~/storage/utils/storage_days'
import { MockMealsGrouped, mockDays } from './mockMeals'
import * as mealsStorageActions from '~/storage/meals/getMealsByDays'
import AsyncStorage from '@react-native-async-storage/async-storage'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
describe('Home Screen', () => {
  const loadingIndicatorID = 'loading-indicator'
  const emptyFeedbackID = 'empty-feedback'

  beforeEach(() => {
    jest.clearAllMocks()
    AsyncStorage.clear()
  })

  const useMockedStoredMeals = () => {
    jest.spyOn(daysStorageActions, 'getStoredDays').mockResolvedValue(mockDays)

    jest
      .spyOn(mealsStorageActions, 'getMealsByDays')
      .mockResolvedValue(MockMealsGrouped)
  }

  it('should show the loading indication and empty feedback correctly', async () => {
    jest
      .mocked(useNavigation)
      .mockReturnValue({ navigate: jest.fn(), addListener: jest.fn() })
    render(<Home />)

    const loadingIndicator = screen.getByTestId(loadingIndicatorID)

    expect(loadingIndicator).toBeOnTheScreen()
    expect(screen.queryByTestId(emptyFeedbackID)).toBeNull()

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('loading-indicator'),
    )
    expect(screen.getByTestId(emptyFeedbackID)).toBeVisible()
  })
  it('should be able to navigate to new-meal page', async () => {
    const navigate = jest.fn()

    jest
      .mocked(useNavigation)
      .mockReturnValue({ navigate, addListener: jest.fn() })

    render(<Home />)

    const btnNewMeal = screen.getByTestId('btn-new-meal')

    // Act navigate
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.press(btnNewMeal)
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith('new-meal')
    })
  })
  it('should be able to navigate to meal page', async () => {
    const navigate = jest.fn()

    jest
      .mocked(useNavigation)
      .mockReturnValue({ navigate, addListener: jest.fn() })

    useMockedStoredMeals()

    render(<Home />)

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('loading-indicator'),
    )

    const cardsMeal = screen.getAllByTestId('card-meal')

    // Act navigate
    fireEvent.press(cardsMeal[0])

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('meal', {
      meal: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        inDiet: expect.any(Boolean),
        date: expect.any(String),
      }),
      groupName: expect.any(String),
    })
  })
  it('should render correctly the meals grouped by date', async () => {
    jest
      .mocked(useNavigation)
      .mockReturnValue({ navigate: jest.fn(), addListener: jest.fn() })
    const mealsCount = MockMealsGrouped.flatMap((item) => item.meals).length
    const headingsCount = MockMealsGrouped.length
    useMockedStoredMeals()

    render(<Home />)

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('loading-indicator'),
    )

    await waitFor(() => {
      expect(screen.queryAllByTestId('card-meal').length).toBe(mealsCount)
    })

    const groupsHeading = screen.getAllByTestId('group-heading')

    expect(groupsHeading.length).toBe(headingsCount)
    screen.unmount()
  })
})
