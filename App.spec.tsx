import { StatusBar } from 'expo-status-bar'
import * as expoFonts from 'expo-font'

import { render, screen } from '~/utils/test-utils'

import App from './App'

jest.mock('expo-font')

describe('Hello', () => {
  const useFontsSpy = jest.spyOn(expoFonts, 'useFonts')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const appRoutesWrapperID = 'app-routes-wrapper'
  it('should render correctly when fonts is NOT loaded', async () => {
    useFontsSpy.mockReturnValue([false, null])
    render(<App />)

    expect(screen.UNSAFE_queryByType(StatusBar)).toBeNull()
    expect(screen.queryByTestId(appRoutesWrapperID)).toBeNull()
  })

  it('should render correctly when fonts is loaded', async () => {
    useFontsSpy.mockReturnValue([true, null])
    render(<App />)

    expect(screen.UNSAFE_getByType(StatusBar)).toBeOnTheScreen()
    expect(screen.getByTestId(appRoutesWrapperID)).toBeOnTheScreen()
  })
})
