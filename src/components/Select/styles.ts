import styled, { css, DefaultTheme } from 'styled-components/native'

import { Text } from '../Text'
import { Pressable } from 'react-native'

export type Variant = 'green' | 'red'

type ContainerProps = {
  variant: Variant
  isSelected: boolean
}

const buttonsVariantStyle: Record<
  Variant,
  (theme: DefaultTheme) => ReturnType<typeof css>
> = {
  green: (theme) => css`
    border-color: ${theme.colors['green-900']};
    background-color: ${theme.colors['green-100']};
  `,
  red: (theme) => css`
    border-color: ${theme.colors['red-900']};
    background-color: ${theme.colors['red-100']};
  `,
}

export const Container = styled(Pressable)<ContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
  gap: 8px;
  border-radius: 8px;
  border-width: 1.5px;

  border-color: ${({ theme }) => theme.colors['gray-200']};
  background-color: ${({ theme }) => theme.colors['gray-200']};

  ${({ variant, theme, isSelected }) =>
    isSelected && buttonsVariantStyle[variant](theme)}
`

type DotProps = {
  variant: Variant
}

export const Dot = styled.View<DotProps>`
  width: 8px;
  height: 8px;
  border-radius: 99999px;

  background-color: ${({ theme, variant }) =>
    variant === 'green' ? theme.colors['green-900'] : theme.colors['red-900']};
`

export const Label = styled(Text).attrs({ size: 'sm', weight: 'bold' })``
