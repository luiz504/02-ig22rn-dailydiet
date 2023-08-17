import styled from 'styled-components/native'

export const Row = styled.View`
  gap: 8px;
  margin-bottom: 24px;
`
export const DietCard = styled.View`
  padding: 8px 16px;
  border-radius: 999px;

  gap: 8px;
  background-color: ${({ theme }) => theme.colors['gray-200']};

  flex-direction: row;
  align-self: flex-start;
  align-items: center;
`
export const Dot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 999px;
`

export const Col = styled.View`
  margin-top: auto;
  gap: 8px;
`
