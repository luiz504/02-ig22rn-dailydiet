import { FC } from 'react'
import { View } from 'react-native'
import { styled } from 'styled-components/native'

// import styles from './styles'
export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.regular};
  font-size: 50px;
`

export const Dummy: FC = () => {
  return (
    <View>
      <Text> Dummy </Text>
    </View>
  )
}
