import { fireEvent, render, screen } from '~/utils/test-utils'
import { MealScreen } from '.'
import { Meal } from '~/models/Meal'
import { useNavigation, useRoute } from '@react-navigation/native'

import { theme } from '~/styles'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
    useNavigation: jest.fn(),
  }
})

const mockMealInDiet: Meal = {
  date: new Date().toString(),
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

  it('should navigate to Edit Meal screen correctly', () => {
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
})
