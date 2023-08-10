// import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'

import { HeaderUserLogo } from '~/components/HeaderUserLogo'

import { Theme } from '~/components/Theme'
// import { CardStatistics } from './components/CardStatistics'

export const Home: FC = () => {
  // const navigator = useNavigation()
  return (
    <Theme
      variant="white"
      style={{ paddingHorizontal: 24 }}
      testID="home-screen-container"
    >
      <HeaderUserLogo />

      {/* <CardStatistics percentage={50} />
      <CardStatistics percentage={55.19} />

      <CardStatistics percentage={75.1} /> */}
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
