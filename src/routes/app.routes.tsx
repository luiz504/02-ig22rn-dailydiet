import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'
import { Home } from '~/screens/Home'
import { NewDiet } from '~/screens/NewDiet'

const { Navigator, Screen } = createNativeStackNavigator()
export const AppRoutes = () => {
  const theme = useTheme()
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors['gray-100'] }}
      testID="app-routes-wrapper"
    >
      <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
        <Screen name="home" component={Home} />
        <Screen name="new-diet" component={NewDiet} />
      </Navigator>
    </SafeAreaView>
  )
}
