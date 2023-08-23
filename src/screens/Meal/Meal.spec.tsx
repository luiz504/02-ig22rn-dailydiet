import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { fireEvent, render, screen, waitFor } from '~/utils/test-utils'
import { MealScreen } from '.'
import { Meal } from '~/models/Meal'

import * as DeleteMealModule from '~/storage/meals/deleteMeal'

import { theme } from '~/styles'
import { setStoredMeals } from '~/storage/utils/storage_meal'
import { setStoredDays } from '~/storage/utils/storage_days'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
    useNavigation: jest.fn(),
  }
})

const mockMealInDiet: Meal = {
  date: new Date().toISOString(),
  name: 'Tapioca with fake stuffing',
  description: 'In Diet Fake Meal',
  id: 'fake-id',
  inDiet: true,
}
describe('Meal Screen', () => {
  const cardStatusID = 'diet-status-card'
  const cardStatusDotID = 'diet-status-dot'
  const cardStatusLabelID = 'diet-status-label'

  const containerID = 'container'
  const alertDeleteID = 'alert-delete-modal'
  const btnDeleteID = 'btn-delete'
  const btnEditID = 'btn-edit'

  beforeEach(() => {
    jest.clearAllMocks()

    jest
      .mocked(useRoute)
      .mockReturnValue({ params: { meal: mockMealInDiet } } as any)
  })

  const useDeleteMealSpy = () => jest.spyOn(DeleteMealModule, 'deleteMeal')

  it('should render correctly inDiet', () => {
    render(<MealScreen />)

    expect(screen.getByTestId(containerID)).toHaveStyle({
      backgroundColor: theme.colors['green-100'],
    })
    expect(screen.getByText('Meal')).toBeVisible()

    expect(screen.getByTestId('text-name')).toHaveTextContent(
      mockMealInDiet.name,
    )
    expect(screen.getByTestId('text-description')).toHaveTextContent(
      mockMealInDiet.description,
    )

    expect(screen.getByTestId('text-date-time')).toBeVisible()

    expect(screen.getByTestId(cardStatusID)).toBeVisible()
    expect(screen.getByTestId(cardStatusDotID)).toHaveStyle({
      backgroundColor: theme.colors['green-900'],
    })
    expect(screen.getByTestId(cardStatusLabelID)).toHaveTextContent(
      'within the diet',
    )

    expect(screen.getByTestId(btnEditID)).toHaveTextContent('Edit Meal')
    expect(screen.getByTestId(btnDeleteID)).toHaveTextContent('Delete Meal')

    expect(screen.queryByTestId(alertDeleteID)).toBeNull()
  })

  it('should render correctly out of Diet', () => {
    jest.mocked(useRoute).mockReturnValue({
      params: { meal: { ...mockMealInDiet, inDiet: false } },
    } as any)

    render(<MealScreen />)

    expect(screen.getByTestId(containerID)).toHaveStyle({
      backgroundColor: theme.colors['red-100'],
    })

    expect(screen.getByTestId(cardStatusDotID)).toHaveStyle({
      backgroundColor: theme.colors['red-900'],
    })
    expect(screen.getByTestId(cardStatusLabelID)).toHaveTextContent(
      'outside the diet',
    )
  })

  it('should open and close the delete alert modal correctly', () => {
    render(<MealScreen />)

    // Initial Asset
    expect(screen.queryByTestId(alertDeleteID)).toBeNull()

    // Act open modal
    fireEvent.press(screen.getByTestId(btnDeleteID))

    // Asset
    expect(screen.getByTestId(alertDeleteID)).toBeVisible()

    // Act close Modal
    fireEvent.press(screen.getByTestId('alert-delete-btn-dismiss'))

    // Asset
    expect(screen.queryByTestId(alertDeleteID)).toBeNull()
  })

  it('should navigate to Edit Meal screen correctly', async () => {
    const navigate = jest.fn()

    jest.mocked(useNavigation).mockReturnValue({ navigate })

    render(<MealScreen />)

    const btnEdit = screen.getByTestId(btnEditID)

    // Act navigate
    fireEvent.press(btnEdit)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('edit-meal', { meal: mockMealInDiet })
  })

  it('should navigate to Edit Home screen correctly', () => {
    const navigate = jest.fn()

    jest.mocked(useNavigation).mockReturnValue({ navigate })

    render(<MealScreen />)

    const btnReturn = screen.getByTestId('btn-return')

    // Act navigate
    fireEvent.press(btnReturn)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('home')
  })

  it('should navigate to Home screen after successfully delete Meal', async () => {
    const groupName = '2023/12/10'
    await setStoredDays([groupName])
    await setStoredMeals(groupName, [mockMealInDiet])
    const deleteMealSpy = useDeleteMealSpy()
    const navigate = jest.fn()

    jest.mocked(useRoute).mockReturnValue({
      params: { meal: mockMealInDiet, groupName },
    } as any)
    jest.mocked(useNavigation).mockReturnValue({ navigate })

    render(<MealScreen />)

    // Act open modal
    fireEvent.press(screen.getByTestId(btnDeleteID))

    await waitFor(async () =>
      expect(await screen.findByTestId('alert-delete-modal')).toBeVisible(),
    )

    fireEvent.press(screen.getByTestId('alert-delete-btn-confirm'))

    await waitFor(() => {
      expect(navigate).toBeCalledWith('home')
    })
    await waitFor(() => {
      expect(deleteMealSpy).toBeCalledWith({
        groupName,
        mealId: mockMealInDiet.id,
      })
    })
  })

  it('should trigger an Alert if some error happen with the deleteMeal Function', async () => {
    const groupName = '2023/12/10'
    await setStoredDays([groupName])
    await setStoredMeals(groupName, [mockMealInDiet])
    useDeleteMealSpy().mockRejectedValue('dd')
    const navigate = jest.fn()
    const alertSpy = jest.spyOn(Alert, 'alert')

    jest.mocked(useRoute).mockReturnValue({
      params: { meal: mockMealInDiet, groupName },
    } as any)
    jest.mocked(useNavigation).mockReturnValue({ navigate })

    render(<MealScreen />)

    // Act open modal
    fireEvent.press(screen.getByTestId(btnDeleteID))

    await waitFor(async () =>
      expect(await screen.findByTestId('alert-delete-modal')).toBeVisible(),
    )

    fireEvent.press(screen.getByTestId('alert-delete-btn-confirm'))

    await waitFor(() =>
      expect(
        screen.getByTestId(btnDeleteID).props.accessibilityState.disabled,
      ).toBe(false),
    )

    await waitFor(() =>
      expect(alertSpy).toBeCalledWith(expect.any(String), expect.any(String)),
    )
    expect(navigate).not.toBeCalled()
  })
})
