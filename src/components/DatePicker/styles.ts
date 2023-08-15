import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import { Text } from '../Text'

export const Button = styled(Pressable).attrs(({ theme }) => ({
  android_ripple: { color: theme.colors['black-06%'] },
}))`
  border-radius: 6px;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors['gray-300']};
  padding: 14px;
`
export const Label = styled(Text)``
