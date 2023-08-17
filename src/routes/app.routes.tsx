import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '~/screens/Home'
import { MealScreen } from '~/screens/Meal'
import { NewMeal } from '~/screens/NewMeal'
import { EditMeal } from '~/screens/EditMeal'

import { StatisticsScreen } from '~/screens/Statistics'

const { Navigator, Screen } = createNativeStackNavigator()
export const AppRoutes = () => {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Screen name="home" component={Home} />
      <Screen name="statistics" component={StatisticsScreen} />

      <Screen name="new-meal" component={NewMeal} />
      <Screen name="meal" component={MealScreen} />

      <Screen name="edit-meal" component={EditMeal} />
    </Navigator>
  )
}
