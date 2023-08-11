// import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'

import { HeaderUserLogo } from '~/components/HeaderUserLogo'

import { Theme } from '~/components/Theme'
import { CardStatistics } from './components/CardStatistics'
import { SectionNew } from './styles'
import { Text } from '~/components/Text'
import { Button } from '~/components/Button'
import { View } from 'react-native'
export const Home: FC = () => {
  // const navigator = useNavigation()
  return (
    <Theme
      variant="white"
      style={{ paddingHorizontal: 24 }}
      testID="home-screen-container"
    >
      <HeaderUserLogo />

      <CardStatistics percentage={50} />

      <SectionNew>
        <Text>Meals</Text>
        <Button label="Btn Solid" />
      </SectionNew>

      <View style={{ gap: 5, paddingVertical: 5 }}>
        <Button variant="outline" label="Btn Outline" />

        <Button label="Btn Solid" icon="pen" />

        <Button
          variant="outline"
          icon="plus"
          label="Btn Outline"
          style={{ alignSelf: 'stretch' }}
        />
      </View>
    </Theme>
  )
}

// <Pressable onPress={() => navigator.navigate('new-diet')}>
//       <Text>New Diet</Text>
//     </Pressable>

//     <Pressable
//       onPress={() => navigator.navigate('statistics', { theme: 'green' })}
//     >
//       <Text>Go to Statistics Green</Text>
//     </Pressable>

//     <Pressable
//       onPress={() => navigator.navigate('statistics', { theme: 'red' })}
//     >
//       <Text>Go to Statistics Red</Text>
//     </Pressable>
