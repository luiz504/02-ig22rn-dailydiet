import { FC, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components/native'
import { render } from '@testing-library/react-native'

import { theme } from '~/styles'
import { NavigationContainer } from '@react-navigation/native'

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  )
}

const ThemedWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const customRender: typeof render = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

const renderThemed: typeof render = (ui, options) =>
  render(ui, { wrapper: ThemedWrapper, ...options })

const splitBorderColor = (borderColor: string) => ({
  borderTopColor: borderColor,
  borderRightColor: borderColor,
  borderBottomColor: borderColor,
  borderLeftColor: borderColor,
})

export * from '@testing-library/react-native'

export { customRender as render, renderThemed, splitBorderColor }
