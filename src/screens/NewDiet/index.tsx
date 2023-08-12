import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { Pressable } from 'react-native'
import { Text } from '~/components/Text'
import { Theme } from '~/components/Theme'

// import styles from './styles'

export const NewDiet: FC = () => {
  const navigator = useNavigation()
  return (
    <Theme
      variant={'green'}
      style={{ alignItems: 'center', justifyContent: 'center', gap: 20 }}
    >
      <Pressable onPress={() => navigator.navigate('home')}>
        <Text> Go Home </Text>
      </Pressable>
    </Theme>
  )
}
