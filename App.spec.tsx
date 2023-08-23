import * as expoFonts from 'expo-font'

import { renderThemed, screen, waitFor } from '~/utils/test-utils'

import App from './App'

jest.mock('expo-font')

describe('Hello', () => {
  const useFontsSpy = jest.spyOn(expoFonts, 'useFonts')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly when fonts is NOT loaded', async () => {
    useFontsSpy.mockReturnValue([false, null])
    const three = renderThemed(<App />).toJSON()

    expect(three).toBeNull()
  })

  it('should render correctly when fonts is loaded', async () => {
    useFontsSpy.mockReturnValue([true, null])
    const three = renderThemed(<App />).toJSON()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).toBeNull()
    })

    expect(three).toBeTruthy()
  })
})
