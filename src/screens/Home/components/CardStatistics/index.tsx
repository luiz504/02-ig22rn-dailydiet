import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Text } from '~/components/Text'

import { Container, ArrowIcon } from './styles'
import { percentageFormatter } from '~/utils/percentageFormatter'

interface CardStatistics extends TouchableOpacityProps {
  percentage: number
}

export const CardStatistics: FC<CardStatistics> = ({ percentage, testID }) => {
  const theme = useTheme()
  const arrowColor =
    percentage > 75 ? theme.colors['green-900'] : theme.colors['red-900']

  const backgroundColor =
    percentage > 75 ? theme.colors['green-100'] : theme.colors['red-100']

  const percentageString = percentageFormatter(percentage)

  return (
    <Container style={{ backgroundColor }} testID={testID}>
      <ArrowIcon color={arrowColor} testID="arrow-icon" />
      <Text weight="bold" size={'2xl'} testID="heading">
        {percentageString}
      </Text>
      <Text size={'sm'} testID="span">
        of the meals within the diet
      </Text>
    </Container>
  )
}
