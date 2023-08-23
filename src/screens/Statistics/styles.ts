import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  flex: 1;
`
export const Header = styled(View)`
  align-items: center;
  padding: 34px 24px;
  position: relative;
`

export const ArrowBtn = styled(TouchableOpacity)`
  position: absolute;
  border-radius: 6px;

  padding: 6px;
  top: 10px;
  left: 18px;
`
export const DetailsSection = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors['gray-100']};
  border-radius: 20px;

  padding: 33px 24px;
  align-items: center;
  gap: 12px;
`

type CardVariant = 'gray' | 'green' | 'red'

const cardColorVariants: Record<CardVariant, ReturnType<typeof css>> = {
  gray: css`
    background-color: ${({ theme }) => theme.colors['gray-200']};
  `,
  green: css`
    background-color: ${({ theme }) => theme.colors['green-500']};
  `,
  red: css`
    background-color: ${({ theme }) => theme.colors['red-500']};
  `,
}

type CardProps = {
  variant: CardVariant
}

export const Card = styled.View<CardProps>`
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  align-self: stretch;

  ${({ variant }) => cardColorVariants[variant]}
`

export const DetailsRow = styled.View`
  flex-direction: row;
  gap: 12px;
`
