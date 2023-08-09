import { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import icon from '~/assets/icon.png'
import { Dummy } from '~/components/Dummy'

export const Home: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Image
        source={icon}
        style={{ height: 300, objectFit: 'scale-down' }}
        alt="Hello"
      />
      <Dummy />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
