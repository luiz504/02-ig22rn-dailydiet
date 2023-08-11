import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { format } from 'date-fns'
import { useTheme } from 'styled-components/native'

import { Text } from '~/components/Text'

import { Container, HR, StatusIndicator } from './styles'
import { Meal } from '~/models/Meal'

interface CardMealProps extends TouchableOpacityProps {
  meal: Meal
}

export const CardMeal: FC<CardMealProps> = ({ meal, ...rest }) => {
  const { date } = meal

  const theme = useTheme()

  const statusColor = meal.inDiet
    ? theme.colors['green-500']
    : theme.colors['red-500']

  const hourWithMinutes = format(new Date(date), 'HH:mm')

  return (
    <Container {...rest}>
      <Text size="xs" weight="bold" testID="hour">
        {hourWithMinutes}
      </Text>

      <HR testID="hr" />

      <Text style={{ flex: 1 }} numberOfLines={1} color="gray-700">
        {meal.name}
      </Text>

      <StatusIndicator
        style={{ backgroundColor: statusColor }}
        testID="status"
      />
    </Container>
  )
}
