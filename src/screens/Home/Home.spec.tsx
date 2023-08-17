import { fireEvent, render, screen } from '~/utils/test-utils'
import { Home } from '.'
import { useNavigation } from '@react-navigation/native'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
describe('Home Screen', () => {
  it('should render correctly', () => {
    jest
      .mocked(useNavigation)
      .mockReturnValue({ navigate: jest.fn(), addListener: jest.fn() })
    render(<Home />)
  })
  it('should be able to navigate to new-meal page', () => {
    const navigate = jest.fn()

    jest
      .mocked(useNavigation)
      .mockReturnValue({ navigate, addListener: jest.fn() })

    render(<Home />)

    const btnNewMeal = screen.getByTestId('btn-new-meal')

    // Act navigate
    fireEvent.press(btnNewMeal)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('new-meal')
  })

  it('should be able to navigate to meal page', () => {
    const navigate = jest.fn()

    jest
      .mocked(useNavigation)
      .mockReturnValue({ navigate, addListener: jest.fn() })

    render(<Home />)

    const cardsMeal = screen.getAllByTestId('card-meal')

    // Act navigate
    fireEvent.press(cardsMeal[0])

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('meal', {
      meal: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        inDiet: expect.any(Boolean),
        date: expect.any(String),
      }),
    })
  })
})
