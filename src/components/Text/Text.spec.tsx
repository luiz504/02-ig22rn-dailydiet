import { render } from '~/utils/test-utils'
import { Text } from '.'
import { theme } from '~/styles'

describe('Text Component', () => {
  const fontSizes = Object.keys(theme.fontSize)
  it('should render without errors with default style', () => {
    const componentSnapshot = render(<Text />).toJSON()

    expect(componentSnapshot).toMatchSnapshot()
  })

  it('should render with props weight = bold', () => {
    const componentSnapshot = render(<Text weight="bold" />).toJSON()

    expect(componentSnapshot).toMatchSnapshot()
  })

  fontSizes.forEach((fontSize) => {
    it(`should be able to integrate theme fontSize "${fontSize}" within the props "size"`, () => {
      const componentSnapshot = render(
        <Text size={fontSize as keyof typeof theme.fontSize} />,
      ).toJSON()

      expect(componentSnapshot).toMatchSnapshot()
    })
  })
})
