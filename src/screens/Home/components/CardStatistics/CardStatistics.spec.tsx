import { render, screen } from '~/utils/test-utils'
import { CardStatistics } from '.'
import { mockStatistics } from '../../mockMeals'

describe('CardStatistics Component', () => {
  const buttonID = 'btn'

  it('should render correctly with percentage >= 75', () => {
    render(
      <CardStatistics
        statistics={{ ...mockStatistics, inDietPercentage: 75.4 }}
        testID={buttonID}
      />,
    )
    const buttonElement = screen.getByTestId(buttonID)
    const contentAnimated = screen.getByTestId('content-animated')
    const arrowIconElement = screen.getByTestId('arrow-icon')
    const headingElement = screen.getByTestId('heading')
    const spanElement = screen.getByTestId('span')

    expect(screen.getByTestId('animated-wrapper')).toHaveProp(
      'sharedTransitionTag',
      'tag',
    )

    expect(buttonElement.props.style).toMatchSnapshot('btn-style')

    expect(contentAnimated.props.style).toMatchSnapshot('content-animated')

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
    const buttonElement = screen.getByTestId(buttonID)

    const arrowIconElement = screen.getByTestId('arrow-icon')
    const headingElement = screen.getByTestId('heading')

    expect(buttonElement.props.style).toMatchSnapshot('btn-style-outDiet')

    expect(headingElement).toHaveTextContent('40.11%')

    expect(arrowIconElement.props.color).toMatchSnapshot(
      'arrow-icon-prop-outDiet',
    )
  })
})
