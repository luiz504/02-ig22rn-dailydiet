import { FC, useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, SectionList } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'

import { HeaderUserLogo } from '~/screens/Home/components/HeaderUserLogo'

import { getStoredDays } from '~/storage/utils/storage_days'
import { getMealsByDays } from '~/storage/meals/getMealsByDays'

import { CardStatistics } from './components/CardStatistics'
import { Theme } from '~/components/Theme'
import { Text } from '~/components/Text'
import { Button } from '~/components/Button'
import { CardMeal } from './components/CardMeal'

import { IndicatorContainer, SectionNew } from './styles'

import { Meal } from '~/models/Meal'

import { processMealStatistics } from '~/utils/processMealsStatistics'
import { MealsSectionList } from './types'

export const Home: FC = () => {
  const navigator = useNavigation()
  const theme = useTheme()

  const handleClickCardMeal = (meal: Meal, groupName: string) => {
    navigator.navigate('meal', { meal, groupName })
  }
  const [isLoading, setIsLoading] = useState(true)
  const [meals, setMeals] = useState<MealsSectionList>([])

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      const loadMeals = async () => {
        try {
          setIsLoading(true)

          const days = await getStoredDays()

          if (days?.length) {
            const mealsByDay = await getMealsByDays(days)

            if (isActive) {
              const mealsByDayFormatted: MealsSectionList = mealsByDay.map(
                (entry) => ({ title: entry.day, data: entry.meals }),
              )

              setMeals(mealsByDayFormatted)
            }
          } else {
            setMeals([])
          }
          isActive && setIsLoading(false)
        } catch (err) {
          setIsLoading(false)
        }
      }

      loadMeals()

      return () => {
        isActive = false
      }
    }, []),
  )

  const statistics = useMemo(() => processMealStatistics(meals), [meals])

  return (
    <Theme
      variant="white"
      style={{ paddingHorizontal: 24, paddingBottom: 8 }}
      testID="home-screen-container"
    >
      <HeaderUserLogo />

      <CardStatistics statistics={statistics} />

      <SectionNew>
        <Text>Meals</Text>

        <Button
          icon="plus"
          label="New meal"
          onPress={() => navigator.navigate('new-meal')}
          testID="btn-new-meal"
        />
      </SectionNew>

      {!!meals.length && (
        <SectionList
          sections={meals}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ gap: 8 }]}
          renderSectionHeader={({ section: { title } }) => (
            <Text
              size="lg"
              weight="bold"
              style={{ marginTop: 24 }}
              testID="group-heading"
            >
              {title}
            </Text>
          )}
          renderItem={({ item, section: { title } }) => (
            <CardMeal
              meal={item}
              activeOpacity={0.65}
              onPress={() => handleClickCardMeal(item, title)}
              testID="card-meal"
            />
          )}
          fadingEdgeLength={32}
        />
      )}

      {isLoading && (
        <IndicatorContainer>
          <ActivityIndicator
            size={'large'}
            color={theme.colors['gray-400']}
            testID="loading-indicator"
          />
        </IndicatorContainer>
      )}
      {!isLoading && !meals.length && (
        <IndicatorContainer>
          <Text color={'gray-700'} testID="empty-feedback">
            No Meals Records found.
          </Text>
        </IndicatorContainer>
      )}
    </Theme>
  )
}
