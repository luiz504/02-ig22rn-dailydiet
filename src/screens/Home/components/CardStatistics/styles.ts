import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import ArrowUp from '~/assets/icons/arrow-right-up.svg'
import Animated from 'react-native-reanimated'

export const AnimatedWrapper = styled(Animated.View)`
  margin-top: 12px;
  margin-bottom: 40px;
`

export const Container = styled(Pressable)`
  padding: 20px 16px;
  border-radius: 8px;

  position: relative;
`
export const ContentAnimated = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`

export const ArrowIcon = styled(ArrowUp)`
  position: absolute;
  top: 0px;
  right: 0px;
`
