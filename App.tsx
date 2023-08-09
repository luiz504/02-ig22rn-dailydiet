import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components'

import { Home } from '~/screens/Home'

export default function App() {
  return (
    <ThemeProvider theme={{}}>
      <StatusBar style="auto" />

      <Home />
    </ThemeProvider>
  )
}
