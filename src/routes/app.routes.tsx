import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '~/screens/Home'
import { NewDiet } from '~/screens/NewDiet'
import { StatisticsScreen } from '~/screens/Statistics'

const { Navigator, Screen } = createNativeStackNavigator()
export const AppRoutes = () => {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false, animation: 'slide_from_left' }}
    >
      <Screen name="home" component={Home} />
      <Screen
        name="statistics"
        component={StatisticsScreen}
        options={{ animation: 'fade' }}
      />

      <Screen
        name="new-diet"
        component={NewDiet}
        options={{ animation: 'fade' }}
      />
    </Navigator>
  )
}
