import { forwardRef, useState } from 'react'
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native'

import { StyledInput } from './styles'

import { useTheme } from 'styled-components/native'

export const Input = forwardRef<TextInput, TextInputProps>(
  ({ onFocus, onBlur, ...rest }, ref) => {
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
      <StyledInput
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        isFocused={isFocused}
        cursorColor={theme.colors['gray-800']}
        {...rest}
      />
    )
  },
)

Input.displayName = 'Input'
