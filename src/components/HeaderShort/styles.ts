import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  padding: 17px 24px 32px 16px;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const BtnReturn = styled(TouchableOpacity)`
  position: absolute;
  left: 24px;
  bottom: 28px;
`
