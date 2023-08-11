import { render, screen } from '~/utils/test-utils'
import { CardMeal } from '.'
import { Meal } from '~/models/Meal'

describe('CardMeal Component', () => {
  const mockMeals: Meal[] = [
    {
      id: 'm1',
      name: 'fake Meal',
      description: 'fake Description',
      date: new Date().toISOString(),
      inDiet: true,
    },
    {
      id: 'm2',
      name: 'fake Meal 2',
      description: 'fake Description 2',
      date: new Date().toISOString(),
      inDiet: false,
    },
  ]

  const containerID = 'card'
  it('should render correctly with meal props property "inDiet" as true', () => {
    const currentMeal = mockMeals[0]
    render(<CardMeal meal={currentMeal} testID={containerID} />)

    const containerBtnElement = screen.getByTestId(containerID)
    const hourTextElement = screen.getByTestId('hour')
    const hrElement = screen.getByTestId('hr')
    const nameTextElement = screen.getByText(currentMeal.name)
    const statusElement = screen.getByTestId('status')

    expect(containerBtnElement.props.style).toMatchSnapshot('container-style')
    expect(hourTextElement.props.style).toMatchSnapshot('hour-text-style')
    expect(hrElement.props.style).toMatchSnapshot('hr-style')
    expect(nameTextElement.props.style).toMatchSnapshot('name-text-style')
    expect(nameTextElement.props.numberOfLines).toBe(1)
    expect(statusElement.props.style).toMatchSnapshot('status-style')
  })

  it('should render correctly with meal props property "inDiet" as false', () => {
    const currentMeal = mockMeals[1]
    render(<CardMeal meal={currentMeal} testID={containerID} />)

    const statusElement = screen.getByTestId('status')

    expect(statusElement.props.style).toMatchSnapshot('status-style')
  })

  it('should render correctly the HH:mm time format', () => {
    const currentMeal = mockMeals[0]
    render(<CardMeal meal={currentMeal} testID={containerID} />)
    const hourTextElement = screen.getByTestId('hour')

    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/

    expect(hourTextElement).toHaveTextContent(regex)
  })
})
