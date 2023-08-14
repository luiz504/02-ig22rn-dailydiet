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
    it('should render correctly the variant green', () => {
      let selected = false

      render(
        <Select.Button isSelected={selected} variant="green" testID="button">
          <Select.Label>Text</Select.Label>
        </Select.Button>,
      )

      const btnElement = screen.getByTestId('button')

      const { variant, isSelected } = btnElement.props

      expect({ variant, isSelected }).toEqual({
        variant: 'green',
        isSelected: false,
      })

      expect(btnElement.props.style).toMatchSnapshot('btn-green-not-selected')

      selected = true

      screen.rerender(
        <Select.Button isSelected={selected} variant="green" testID="button">
          <Select.Label>Text</Select.Label>
        </Select.Button>,
      )

      expect(btnElement.props.isSelected).toBe(true)
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

      const { variant, isSelected } = btnElement.props

      expect({ variant, isSelected }).toEqual({
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

      expect(btnElement.props.isSelected).toBe(true)
      expect(btnElement.props.style).toMatchSnapshot('btn-red-selected')
    })
  })
})
