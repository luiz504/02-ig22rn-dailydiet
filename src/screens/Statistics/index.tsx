import { useNavigation, useRoute } from '@react-navigation/native'
import { FC } from 'react'
import { Pressable } from 'react-native'
import { Text } from '~/components/Text'
import { Theme } from '~/components/Theme'

// import styles from './styles'

type RouteParams = {
  theme: 'red' | 'green'
}

export const Statistics: FC = () => {
  const navigator = useNavigation()

  const { theme } = useRoute().params as RouteParams
  return (
    <Theme
      variant={theme}
      style={{ alignItems: 'center', justifyContent: 'center', gap: 20 }}
    >
      <Pressable onPress={() => navigator.navigate('home')}>
        <Text> Go Home </Text>
      </Pressable>
    </Theme>
  )
}
