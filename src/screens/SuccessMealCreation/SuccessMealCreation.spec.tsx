import { fireEvent, render, screen } from '~/utils/test-utils'
import { SuccessMealCreation } from '.'
import { useNavigation, useRoute } from '@react-navigation/native'
import { theme } from '~/styles'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
    useNavigation: jest.fn(),
  }
})

beforeEach(() => {
  jest.clearAllMocks()
})
const useNavigationMock = () => {
  const navigate = jest.fn()
  jest.mocked(useNavigation).mockReturnValue({ navigate } as any)
  return { navigate }
}
describe('SuccessMealCreation Component', () => {
  it('should render correctly inDiet', () => {
    useNavigationMock()
    jest.mocked(useRoute).mockReturnValue({ params: { inDiet: true } } as any)
    render(<SuccessMealCreation />)

    expect(screen.getByTestId('heading')).toHaveStyle({
      marginBottom: 8,
      color: theme.colors['green-900'],
    })

    expect(screen.getByTestId('sub-heading')).toHaveStyle({ marginBottom: 40 })
    expect(screen.getByTestId('in-diet-svg')).toBeVisible()
    expect(screen.queryByTestId('out-diet-svg')).toBeNull()

    expect(screen.getByTestId('btn-go-home')).toHaveStyle({
      marginTop: 32,
    })
  })

  it('should render correctly outDiet', () => {
    useNavigationMock()
    jest.mocked(useRoute).mockReturnValue({ params: { inDiet: false } } as any)
    render(<SuccessMealCreation />)

    expect(screen.getByTestId('heading')).toHaveStyle({
      marginBottom: 8,
      color: theme.colors['red-900'],
    })

    expect(screen.getByTestId('out-diet-svg')).toBeVisible()
    expect(screen.queryByTestId('in-diet-svg')).toBeNull()
  })

  it('should Navigate to Home screen when click on btn Go to the homepage', () => {
    const { navigate } = useNavigationMock()
    jest.mocked(useRoute).mockReturnValue({ params: { inDiet: false } } as any)
    render(<SuccessMealCreation />)

    expect(screen.getByTestId('heading')).toHaveStyle({
      marginBottom: 8,
      color: theme.colors['red-900'],
    })

    fireEvent.press(screen.getByTestId('btn-go-home'))

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('home')
  })
})
