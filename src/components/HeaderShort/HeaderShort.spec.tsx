import { render, screen } from '~/utils/test-utils'
import { HeaderShort } from '.'
import { theme } from '~/styles'

describe('HeaderShort Component', () => {
  const title = 'Some Title'
  it('should render correctly', () => {
    render(<HeaderShort onReturnRequest={() => {}} title={title} />)

    expect(screen.getByTestId('btn-return').props.style).toMatchSnapshot(
      'btn-return',
    )
    expect(screen.getByTestId('arrow-left-icon')).toHaveProp(
      'color',
      theme.colors['gray-700'],
    )

    const headingElement = screen.getByText(title)
    const { size, weight } = headingElement.props
    expect({ size, weight }).toEqual({ size: 'lg', weight: 'bold' })
  })
})
