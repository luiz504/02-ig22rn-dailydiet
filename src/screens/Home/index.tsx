import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { Pressable } from 'react-native'

import { Text } from '~/components/Text'
import { Theme } from '~/components/Theme'

export const Home: FC = () => {
  const navigator = useNavigation()
  return (
    <Theme
      variant="white"
      style={{ alignItems: 'center', justifyContent: 'center', gap: 20 }}
      testID="home-screen-container"
    >
      <Pressable onPress={() => navigator.navigate('new-diet')}>
        <Text>New Diet</Text>
      </Pressable>

      <Pressable
        onPress={() => navigator.navigate('statistics', { theme: 'green' })}
      >
        <Text>Go to Statistics Green</Text>
      </Pressable>

      <Pressable
        onPress={() => navigator.navigate('statistics', { theme: 'red' })}
      >
        <Text>Go to Statistics Red</Text>
      </Pressable>
    </Theme>
  )
}
