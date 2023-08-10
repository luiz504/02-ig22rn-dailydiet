import { render, screen } from '~/utils/test-utils'
import { CardStatistics } from '.'

describe('CardStatistics Component', () => {
  const containerID = 'card'

  const elements = () => {
    const containerElement = screen.getByTestId(containerID)
    const arrowIconElement = screen.getByTestId('arrow-icon')
    const headingElement = screen.getByTestId('heading')
    const spanElement = screen.getByTestId('span')

    return { containerElement, headingElement, arrowIconElement, spanElement }
  }

  it('should render correctly with percentage >= 75', () => {
    render(<CardStatistics percentage={75.4} testID={containerID} />)
    const { containerElement, headingElement, arrowIconElement, spanElement } =
      elements()

    expect(containerElement.props.style).toMatchSnapshot()

    expect(headingElement).toHaveTextContent('75.40%')

    expect(arrowIconElement.props.color).toMatchSnapshot()

    expect(spanElement.props.style).toMatchSnapshot()
  })

  it('should render correctly with percentage < 75', () => {
    render(<CardStatistics percentage={40.111} testID={containerID} />)
    const { containerElement, headingElement, arrowIconElement, spanElement } =
      elements()

    expect(containerElement.props.style).toMatchSnapshot()

    expect(headingElement).toHaveTextContent('40.11%')

    expect(arrowIconElement.props.color).toMatchSnapshot()

    expect(spanElement.props.style).toMatchSnapshot()
  })
})
