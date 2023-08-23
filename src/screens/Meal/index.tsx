import { useNavigation, useRoute } from '@react-navigation/native'
import { FC, useState } from 'react'
import { useTheme } from 'styled-components/native'

import { formatDateAndTime } from '~/utils/dateTimeFormatters'

import { ContentSection } from '~/components/ContentSection'
import { HeaderShort } from '~/components/HeaderShort'
import { Text } from '~/components/Text'
import { Theme } from '~/components/Theme'
import { Button } from '~/components/Button'
import { AlertDelete } from './components/AlertDelete'

import { Row, DietCard, Dot, Col } from './styles'

import { Meal } from '~/models/Meal'
import { Alert } from 'react-native'

import { deleteMeal } from '~/storage/meals/deleteMeal'

type RouteParams = {
  meal: Meal
  groupName: string
}

export const MealScreen: FC = () => {
  const navigator = useNavigation()
  const theme = useTheme()
  const { meal, groupName } = useRoute().params as RouteParams

  const themeVariant = meal.inDiet ? 'green' : 'red'

  const dietCardLabel = meal.inDiet ? 'within the diet' : 'outside the diet'
  const dotColor = meal.inDiet
    ? theme.colors['green-900']
    : theme.colors['red-900']

  const dateAndTimeString = formatDateAndTime(meal.date)

  const handleEditMeal = () => {
    navigator.navigate('edit-meal', { meal, groupName })
  }
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDeleteMeal = async () => {
    try {
      setIsDeleting(true)
      await deleteMeal({ groupName, mealId: meal.id })

      navigator.navigate('home')
    } catch (err) {
      setIsDeleting(false)

      Alert.alert(
        'Delete Meal Error',
        'Something went wrong with the deletion request.',
      )
    }
  }

  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const handleRequestDeleteMeal = (type: 'request' | 'abort') => {
    setShowDeleteAlert(type === 'request')
  }

  return (
    <>
      <Theme variant={themeVariant} testID="container">
        <HeaderShort
          title="Meal"
          onReturnRequest={() => navigator.navigate('home')}
          disabledReturn={isDeleting}
        />

        <ContentSection>
          <Row>
            <Text
              weight="bold"
              style={{ fontSize: 20, lineHeight: 26 }}
              testID="text-name"
            >
              {meal.name}
            </Text>

            <Text testID="text-description">{meal.description}</Text>
          </Row>

          <Row>
            <Text weight="bold" size="sm">
              Date and time
            </Text>

            <Text testID="text-date-time">{dateAndTimeString}</Text>
          </Row>

          <DietCard testID="diet-status-card">
            <Dot
              style={{ backgroundColor: dotColor }}
              testID="diet-status-dot"
            />
            <Text size="sm" testID="diet-status-label">
              {dietCardLabel}
            </Text>
          </DietCard>

          <Col>
            <Button
              icon="pen"
              label="Edit Meal"
              onPress={handleEditMeal}
              disabled={isDeleting}
              testID="btn-edit"
            />

            <Button
              icon="trash"
              variant="outline"
              label="Delete Meal"
              onPress={() => handleRequestDeleteMeal('request')}
              disabled={isDeleting}
              testID="btn-delete"
            />
          </Col>
        </ContentSection>
      </Theme>

      <AlertDelete
        show={showDeleteAlert}
        onDismiss={() => handleRequestDeleteMeal('abort')}
        onConfirm={handleDeleteMeal}
      />
    </>
  )
}
