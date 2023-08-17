import { useNavigation, useRoute } from '@react-navigation/native'
import { FC, useState } from 'react'
import { useTheme } from 'styled-components/native'

import { formatDateAndTime } from '~/utils/dataTimeFormatter'

import { ContentSection } from '~/components/ContentSection'
import { HeaderShort } from '~/components/HeaderShort'
import { Text } from '~/components/Text'
import { Theme } from '~/components/Theme'
import { Button } from '~/components/Button'
import { AlertDelete } from './components/AlertDelete'

import { Row, DietCard, Dot, Col } from './styles'

import { Meal } from '~/models/Meal'

type RouteParams = {
  meal: Meal
}

export const MealScreen: FC = () => {
  const navigator = useNavigation()
  const theme = useTheme()
  const { meal } = useRoute().params as RouteParams

  const themeVariant = meal.inDiet ? 'green' : 'red'

  const dietCardLabel = meal.inDiet ? 'within the diet' : 'outside the diet'
  const dotColor = meal.inDiet
    ? theme.colors['green-900']
    : theme.colors['red-900']

  const dateAndTimeString = formatDateAndTime(meal.date)

  const handleEditMeal = () => {
    navigator.navigate('edit-meal', { meal })
  }

  const handleDeleteMeal = () => {
    navigator.navigate('home')
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
              testID="btn-edit"
            />

            <Button
              icon="trash"
              variant="outline"
              label="Delete Meal"
              onPress={() => handleRequestDeleteMeal('request')}
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
