import { FC, useState } from 'react'

import { TextInput } from './styles'
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native'
import { useTheme } from 'styled-components/native'

export const Input: FC<TextInputProps> = ({ onFocus, onBlur, ...rest }) => {
  const theme = useTheme()
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  return (
    <TextInput
      onFocus={handleFocus}
      onBlur={handleBlur}
      isFocused={isFocused}
      cursorColor={theme.colors['gray-800']}
      {...rest}
    />
  )
}
