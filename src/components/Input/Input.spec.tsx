import { fireEvent, render, screen, splitBorderColor } from '~/utils/test-utils'
import { Input } from '.'
import { theme } from '~/styles'

describe('Input Component', () => {
  it('should render correctly', () => {
    render(<Input testID="input" />)
    const inputElement = screen.getByTestId('input')

    expect(inputElement.props.cursorColor).toBe(theme.colors['gray-800'])
    expect(inputElement.props.style).toMatchSnapshot('input-not-focused')

    // Act
    fireEvent(inputElement, 'focus')

    expect(inputElement).toHaveStyle({
      ...splitBorderColor(theme.colors['gray-600']),
    })

    // Act

    fireEvent(inputElement, 'blur')
    expect(inputElement).toHaveStyle({
      ...splitBorderColor(theme.colors['gray-300']),
    })
  })
})
