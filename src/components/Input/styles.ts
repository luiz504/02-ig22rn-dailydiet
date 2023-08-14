import { css, styled } from 'styled-components/native'

type TextInputProps = {
  isFocused: boolean
}

export const TextInput = styled.TextInput<TextInputProps>`
  padding: 14px;
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
