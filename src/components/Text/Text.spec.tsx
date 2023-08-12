import { render, screen } from '~/utils/test-utils'
import { Text } from '.'
import { theme } from '~/styles'

describe('Text Component', () => {
  const fontSizes = Object.keys(theme.fontSize)
  const colors = Object.keys(theme.colors)
  it('should render without errors with default style', () => {
    const componentSnapshot = render(<Text />).toJSON()

    expect(componentSnapshot).toMatchSnapshot()
  })

  it('should render with props weight = bold', () => {
    const componentSnapshot = render(<Text weight="bold" />).toJSON()

    expect(componentSnapshot).toMatchSnapshot()
  })

  fontSizes.forEach((fs) => {
    it(`should be able to integrate theme fontSize "${fs}" within the props "size"`, () => {
      render(
        <Text size={fs as keyof typeof theme.fontSize} testID="text">
          Text
        </Text>,
      )
      const { fontSize, lineHeight } = screen.getByTestId('text').props.style
      expect({ fontSize, lineHeight }).toMatchSnapshot('fontSize-options')
    })
  })

  colors.forEach((color) => {
    it(`should render correctly the Text with the color assigned = ${color}`, () => {
      render(
        <Text color={color as keyof typeof theme.colors} testID="text">
          Text
        </Text>,
      )

      expect(screen.getByTestId('text').props.style.color).toMatchSnapshot(
        'color-options',
      )
    })
  })
})
