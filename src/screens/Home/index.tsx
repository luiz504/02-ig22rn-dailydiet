import { FC, useState } from 'react'
import { SectionList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { HeaderUserLogo } from '~/screens/Home/components/HeaderUserLogo'

import { Theme } from '~/components/Theme'
import { CardStatistics } from './components/CardStatistics'
import { Text } from '~/components/Text'
import { Button } from '~/components/Button'
import { CardMeal } from './components/CardMeal'

import { SectionNew } from './styles'

import { mockMeals, mockStatistics } from './mockMeals'

import { Meal } from '~/models/Meal'

type MealsSectionList = Array<{ title: string; data: Meal[] }>

export const Home: FC = () => {
  const [dailyMealsList] = useState<MealsSectionList>(
    Object.entries(mockMeals).map(([key, meals]) => ({
      title: key,
      data: meals,
    })),
  )

  const isEmptyList = !dailyMealsList?.length

  const navigator = useNavigation()

  const handleClickCardMeal = (meal: Meal) => {
    navigator.navigate('meal', { meal })
  }
  return (
    <Theme
      variant="white"
      style={{ paddingHorizontal: 24 }}
      testID="home-screen-container"
    >
      <HeaderUserLogo />

      <CardStatistics statistics={mockStatistics} />

      <SectionNew>
        <Text>Meals</Text>
        <Button
          icon="plus"
          label="New meal"
          onPress={() => navigator.navigate('new-meal')}
        />
      </SectionNew>

      <SectionList
        sections={dailyMealsList}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 8 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { gap: 8 },
          isEmptyList && {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        renderSectionHeader={({ section: { title } }) => (
          <Text size="lg" weight="bold" style={{ marginTop: 24 }}>
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <CardMeal
            meal={item}
            activeOpacity={0.65}
            onPress={() => handleClickCardMeal(item)}
          />
        )}
        fadingEdgeLength={32}
      />
    </Theme>
  )
}
