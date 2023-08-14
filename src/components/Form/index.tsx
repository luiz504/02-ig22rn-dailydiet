import { styled } from 'styled-components/native'
import { Text } from '../Text'

const Wrapper = styled.View`
  gap: 24px;
`
type ColProps = {
  variant?: 'sm' | 'md'
}

const Col = styled.View<ColProps>`
  gap: ${({ variant = 'sm' }) => (variant === 'md' ? '8px' : '4px')};
`
type RowProps = {
  variant?: 'md' | 'lg'
}

const Row = styled.View<RowProps>`
  flex-direction: row;

  gap: ${({ variant = 'lg' }) => (variant === 'md' ? '8px' : '20px')};
`

export const Label = styled(Text).attrs(() => ({
  size: 'lg',
  weight: 'bold',
}))``

export const Form = { Wrapper, Col, Row, Label }
