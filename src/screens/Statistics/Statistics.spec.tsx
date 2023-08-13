import { StatisticsScreen } from '.'
import { useNavigation, useRoute } from '@react-navigation/native'
import { mockStatistics } from '../Home/mockMeals'
import { fireEvent, render, screen } from '~/utils/test-utils'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
    useNavigation: jest.fn(),
  }
})

describe('Statistics Screen', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest
      .mocked(useRoute)
      .mockReturnValue({ params: { statistics: mockStatistics } } as any)
  })
  it('should should render correctly', () => {
    render(<StatisticsScreen />)
  })
  it('should navigate home when clicking arrow left btn', () => {
    const navigate = jest.fn()

    jest.mocked(useNavigation).mockReturnValue({ navigate })

    render(<StatisticsScreen />)

    const btnReturn = screen.getByTestId('btn-return')

    // Act
    fireEvent.press(btnReturn)

    // Assert

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('home')
  })
})
