import { css, styled } from 'styled-components/native'
import { TextInput as TextInputNative } from 'react-native'
type TextInputProps = {
  isFocused: boolean
}

export const StyledInput = styled(TextInputNative)<TextInputProps>`
  padding: 11px 14px;
  border-radius: 6px;
  border-width: 1.5px;

  font-size: 16px;

  ${({ isFocused, theme }) => css`
    border-color: ${isFocused
      ? theme.colors['gray-600']
      : theme.colors['gray-300']};

    color: ${theme.colors['gray-800']};
    font-family: ${theme.fontFamily.regular};
  `}
`
