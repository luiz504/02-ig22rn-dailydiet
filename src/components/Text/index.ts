import { css, styled } from 'styled-components/native'
import { theme } from '~/styles'

type Weight = keyof typeof theme.fontFamily
type Size = keyof typeof theme.fontSize

type Color = keyof typeof theme.colors

type TextProps = {
  size?: Size
  weight?: Weight
  color?: Color
}

export const Text = styled.Text<TextProps>`
  ${({ theme, weight = 'regular', size = 'md', color = 'gray-800' }) => css`
    font-family: ${theme.fontFamily[weight]};
    font-size: ${theme.fontSize[size]};
    line-height: ${theme.lineHeight[size]};
    color: ${theme.colors[color]};
  `}
`
