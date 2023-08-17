import { styled } from 'styled-components/native'

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors['black-06%']};
  padding: 24px;
`

export const Content = styled.View`
  padding: 40px 21px 24px 24px;
  gap: 32px;
  background-color: ${({ theme }) => theme.colors['gray-100']};
  border-radius: 8px;
  align-self: stretch;
  align-items: center;
`
export const Row = styled.View`
  flex-direction: row;
  gap: 12px;
`
