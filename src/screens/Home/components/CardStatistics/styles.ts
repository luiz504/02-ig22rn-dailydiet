import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import ArrowUp from '~/assets/icons/arrow-right-up.svg'

export const Container = styled(Pressable)`
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
  top: 6px;
  right: 6px;
`
export const SkeletonContainer = styled.View`
  padding: 20px 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`
