import { css, styled } from 'styled-components/native'
import { theme } from '~/styles'

type Weight = keyof typeof theme.fontFamily
type Size = keyof typeof theme.fontSize

type TextProps = {
  size?: Size
  weight?: Weight
}

export const Text = styled.Text<TextProps>`
  ${({ theme, weight = 'regular', size = 'md' }) => css`
    font-family: ${theme.fontFamily[weight]};
    font-size: ${theme.fontSize[size]};
    line-height: ${theme.lineHeight[size]};
  `}
`
