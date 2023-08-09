import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '~/components/Dummy'

export const Home: FC = () => {
  const navigator = useNavigation()
  return (
    <View style={{ backgroundColor: '#99d9dd' }}>
      <Pressable onPress={() => navigator.navigate('new-diet')}>
        <Text>{`<<`}</Text>
      </Pressable>
    </View>
  )
}
