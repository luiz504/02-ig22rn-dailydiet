import { render, screen } from '~/utils/test-utils'

import { Button } from '.'

import { theme } from '~/styles'
describe('Button Component', () => {
  const label = 'Button Label'
  const btnID = 'btn'
  const contentID = 'content'

  const iconVariations = [
    { icon: 'pen', testId: 'pen-icon' },
    { icon: 'plus', testId: 'plus-icon' },
    { icon: 'trash', testId: 'trash-icon' },
  ] as const

  it('should render correctly with default props (solid no icon)', async () => {
    render(<Button label={label} testID={btnID} />)
    const btnElement = screen.getByTestId(btnID)
    const contentElement = screen.getByTestId(contentID)
    const labelElement = screen.getByText(label)

    expect(contentElement.children).toHaveLength(1)
    expect(labelElement).toBeOnTheScreen()

    expect(btnElement.props.style).toMatchSnapshot('normal-btn-style')
    expect(contentElement.props.style).toMatchSnapshot('content-style')
    expect(labelElement.props.style).toMatchSnapshot('label-style')
  })
  it('should render correctly the variant solid pressed styles', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<Button label={label} testID={btnID} testOnly_pressed />)
    const btnElement = screen.getByTestId(btnID)

    expect(btnElement).toHaveStyle({
      backgroundColor: theme.colors['gray-800'],
      borderColor: theme.colors['gray-700'],
    })
  })

  it('should render correctly with props variant outline', async () => {
    render(<Button variant="outline" label={label} testID={btnID} />)
    const btnElement = screen.getByTestId(btnID)

    const labelElement = screen.getByText(label)

    expect(labelElement).toBeOnTheScreen()

    expect(btnElement.props.style).toMatchSnapshot('normal-btn-style')
    expect(labelElement.props.style).toMatchSnapshot('label-style')
  })
  it('should render correctly the variant outline pressed styles', () => {
    render(
      <Button
        label={label}
        variant="outline"
        testID={btnID}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        testOnly_pressed
      />,
    )
    const btnElement = screen.getByTestId(btnID)

    expect(btnElement).toHaveStyle({
      backgroundColor: theme.colors['gray-300'],
      borderColor: theme.colors['gray-800'],
    })
  })

  iconVariations.forEach((icon) =>
    it(`should render "${icon}" icon correctly`, () => {
      render(<Button icon={icon.icon} label={label} />)

      expect(screen.getByTestId(icon.testId)).toBeOnTheScreen()
    }),
  )
})
