import { styled } from 'styled-components/native'
import { Text } from '../Text'

const Wrapper = styled.View`
  /* gap: 4px; */
`
type ColProps = {
  variant?: 'sm' | 'md'
}

const Col = styled.View<ColProps>`
  gap: ${({ variant = 'sm' }) => (variant === 'md' ? '8px' : '4px')};
  padding-bottom: 24px;
  position: relative;
`
type RowProps = {
  variant?: 'md' | 'lg'
}

const Row = styled.View<RowProps>`
  flex-direction: row;
  position: relative;

  gap: ${({ variant = 'lg' }) => (variant === 'md' ? '8px' : '20px')};
`

export const Label = styled(Text).attrs({
  size: 'md',
  weight: 'bold',
})``
export const Error = styled(Text).attrs({
  size: 'xs',
  color: 'red-900',
})`
  position: absolute;
  left: 0;
  bottom: 5px;
`

export const Form = { Wrapper, Col, Row, Label, Error }
