import { render, screen } from '~/utils/test-utils'
import { Select } from '.'

describe('Select Component', () => {
  describe('Label Component', () => {
    it('should render the Label Component', () => {
      const text = 'Some Text'
      render(<Select.Label testID="label">{text}</Select.Label>)

      const labelElement = screen.getByTestId('label')
      const { size, weight } = labelElement.props
      expect({ size, weight }).toMatchSnapshot('label')

      expect(screen.getByTestId('label')).toHaveTextContent(text)
    })
  })

  describe('Dot Component', () => {
    it('should render the Dot Component variant green', () => {
      render(<Select.Dot variant="green" testID="dot" />)

      expect(screen.getByTestId('dot').props.style).toMatchSnapshot('dot-green')
    })

    it('should render the Dot Component variant red', () => {
      render(<Select.Dot variant="red" testID="dot" />)

      expect(screen.getByTestId('dot').props.style).toMatchSnapshot('dot-red')
    })
  })

  describe('Button Component', () => {
    const getBtnProps = () =>
      screen.UNSAFE_getByProps({
        testID: 'button',
      }).props
    it('should render correctly the variant green', async () => {
      let selected = false

      render(
        <Select.Button isSelected={selected} variant="green" testID="button">
          <Select.Label>Text</Select.Label>
        </Select.Button>,
      )
      const btnElement = screen.getByTestId('button')

      const render1 = getBtnProps()

      expect({
        variant: render1.variant,
        isSelected: render1.isSelected,
      }).toEqual({
        variant: 'green',
        isSelected: false,
      })

      expect(btnElement.props.style).toMatchSnapshot('btn-green-not-selected')
      expect(
        screen.getByTestId('btn-content-wrapper').props.style,
      ).toMatchSnapshot('btn-content-wrapper')

      selected = true

      screen.rerender(
        <Select.Button isSelected={selected} variant="green" testID="button">
          <Select.Label>Text</Select.Label>
        </Select.Button>,
      )

      const render2 = getBtnProps()

      expect(render2.isSelected).toBe(true)
      expect(btnElement.props.style).toMatchSnapshot('btn-green-selected')
    })

    it('should render correctly the variant red', () => {
      let selected = false

      render(
        <Select.Button isSelected={selected} variant="red" testID="button">
          <Select.Label>Text</Select.Label>
        </Select.Button>,
      )

      const btnElement = screen.getByTestId('button')

      const render1 = getBtnProps()

      expect({
        variant: render1.variant,
        isSelected: render1.isSelected,
      }).toEqual({
        variant: 'red',
        isSelected: false,
      })

      expect(btnElement.props.style).toMatchSnapshot('btn-red-not-selected')

      selected = true

      screen.rerender(
        <Select.Button isSelected={selected} variant="red" testID="button">
          <Select.Label>Text</Select.Label>
        </Select.Button>,
      )

      const render2 = getBtnProps()

      expect(render2.isSelected).toBe(true)
      expect(btnElement.props.style).toMatchSnapshot('btn-red-selected')
    })
  })
})
