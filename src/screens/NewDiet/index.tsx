import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

// import styles from './styles'

export const NewDiet: FC = () => {
  const navigator = useNavigation()
  return (
    <View>
      <Pressable onPress={() => navigator.navigate('home')}>
        <Text> Go Home </Text>
      </Pressable>
    </View>
  )
}
