import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import ArrowUp from '~/assets/arrow-right-up.svg'

export const Container = styled(TouchableOpacity)`
  padding: 20px 16px;
  border-radius: 8px;
  margin-top: 12px;
  margin-bottom: 40px;

  position: relative;
  justify-content: center;
  align-items: center;
`
export const ArrowIcon = styled(ArrowUp)`
  position: absolute;
  top: 8px;
  right: 8px;
`
