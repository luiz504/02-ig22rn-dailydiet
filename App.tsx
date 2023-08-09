import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useLayoutEffect } from 'react'

import { ThemeProvider } from 'styled-components/native'
import * as SplashScreen from 'expo-splash-screen'

import { theme } from '~/styles'
import { Routes } from '~/routes'

SplashScreen.preventAutoHideAsync()
export default function App() {
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/NunitoSans_10pt-Regular.ttf'),
    'Nunito-Bold': require('./assets/fonts/NunitoSans_10pt-Bold.ttf'),
  })

  useLayoutEffect(() => {
    fontsLoaded && SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" backgroundColor={theme.colors['gray-400']} />
      <Routes />
    </ThemeProvider>
  )
}
