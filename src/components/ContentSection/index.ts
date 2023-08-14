import { styled } from 'styled-components/native'

export const ContentSection = styled.View`
  border-radius: 20px 20px 0 0;
  background: ${({ theme }) => theme.colors['gray-100']};
  flex: 1;
  padding: 40px 24px 16px 24px;
`
