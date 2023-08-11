import { TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(TouchableHighlight)`
  padding: 14px 24px;
  border-radius: 6px;

  justify-content: center;
  align-items: center;
  border-width: 1.5px;
  border-style: solid;
`

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
