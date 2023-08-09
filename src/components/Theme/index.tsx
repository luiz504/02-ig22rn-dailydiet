import { FC, ReactNode } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ViewProps, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { themeVariants, ThemeVariant } from './constants'

interface ThemeProps extends ViewProps {
  children: ReactNode
  variant?: ThemeVariant
  style?: ViewStyle
}

export const Theme: FC<ThemeProps> = ({
  children,
  style,
  variant = 'white',
  ...rest
}) => {
  return (
    <SafeAreaView
      testID="theme-container"
      {...rest}
      style={{
        flex: 1,
        backgroundColor: themeVariants[variant],
        ...style,
      }}
    >
      <StatusBar style="dark" translucent />
      {children}
    </SafeAreaView>
  )
}
