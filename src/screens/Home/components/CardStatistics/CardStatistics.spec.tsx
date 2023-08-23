import { fireEvent, render, screen } from '~/utils/test-utils'
import { CardStatistics } from '.'
import { mockStatistics } from '../../mockMeals'
import { useNavigation } from '@react-navigation/native'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
describe('CardStatistics Component', () => {
  const buttonID = 'btn'

  const useNavigationSpy = () => {
    const navigate = jest.fn()
    jest
      .mocked(useNavigation)
      .mockReturnValue({ navigate, addListener: jest.fn() })
    return { navigate }
  }
  it('should render correctly with percentage >= 75', () => {
    render(
      <CardStatistics
        statistics={{ ...mockStatistics, inDietPercentage: 75.4 }}
        testID={buttonID}
      />,
    )
    const buttonElement = screen.getByTestId(buttonID)

    const arrowIconElement = screen.getByTestId('arrow-icon')
    const headingElement = screen.getByTestId('heading')
    const spanElement = screen.getByTestId('span')

    expect(buttonElement.props.style).toMatchSnapshot('btn-style')

    expect(headingElement).toHaveTextContent('75.40%')
    expect(headingElement.props.style).toMatchSnapshot('heading-style')

    expect(arrowIconElement.props.color).toMatchSnapshot(
      'arrow-icon-prop-inDiet',
    )

    expect(spanElement.props.style).toMatchSnapshot('text-style')
  })

  it('should render correctly with percentage < 75', () => {
    render(
      <CardStatistics
        statistics={{ ...mockStatistics, inDietPercentage: 40.111 }}
        testID={buttonID}
      />,
    )

    const arrowIconElement = screen.getByTestId('arrow-icon')

    expect(screen.getByTestId(buttonID).props.style).toMatchSnapshot(
      'btn-style-outDiet',
    )

    expect(screen.getByTestId('heading')).toHaveTextContent('40.11%')

    expect(arrowIconElement.props.color).toMatchSnapshot(
      'arrow-icon-prop-outDiet',
    )
  })

  it('should not render correctly when not provided statistics', () => {
    const { navigate } = useNavigationSpy()
    render(<CardStatistics statistics={null} testID={buttonID} />)

    const btnElement = screen.getByTestId(buttonID)
    expect(btnElement.props.style).toMatchSnapshot('btn-no-statistics')

    expect(screen.queryByTestId('arrow-icon')).toBeNull()
    expect(screen.getByTestId('heading')).toHaveTextContent('--')
    // Act

    fireEvent(btnElement, 'onPress')
    expect(navigate).not.toBeCalled()

    fireEvent(btnElement, 'onPress', '12312')
    expect(navigate).not.toBeCalled()
  })

  it('should navigate to Statistics screen when click on the Component', () => {
    const { navigate } = useNavigationSpy()
    render(<CardStatistics statistics={mockStatistics} testID={buttonID} />)

    const btnElement = screen.getByTestId(buttonID)

    fireEvent(btnElement, 'press')

    expect(navigate).toBeCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('statistics', {
      statistics: mockStatistics,
    })
  })
})
