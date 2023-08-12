import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(TouchableOpacity)`
  padding: 14px 16px 14px 12px;
  border-radius: 6px;
  gap: 12px;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors['gray-300']};

  flex-direction: row;
  align-items: center;
`
export const HR = styled.View`
  background-color: ${({ theme }) => theme.colors['gray-400']};
  width: 1px;
  height: 100%;
`
export const StatusIndicator = styled.View`
  height: 14px;
  width: 14px;
  border-radius: 9999px;
`
