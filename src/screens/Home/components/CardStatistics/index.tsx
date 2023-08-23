import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useStatisticsCommons } from '~/hooks/useStatisticsCommons'

import { Text } from '~/components/Text'

import { Container, ArrowIcon } from './styles'

import { Statistics } from '~/models/Statistics'

interface CardStatistics extends TouchableOpacityProps {
  statistics: Statistics | null
}

export const CardStatistics: FC<CardStatistics> = ({ statistics, testID }) => {
  const navigator = useNavigation()

  const {
    percentageString,
    theme: { arrowColor, backgroundColor },
  } = useStatisticsCommons(statistics)

  const handleNavigate = () => {
    navigator.navigate('statistics', { statistics: statistics as Statistics })
  }

  return (
    <Container
      style={{ backgroundColor }}
      testID={testID}
      onPress={handleNavigate}
      disabled={!statistics}
    >
      {statistics && <ArrowIcon color={arrowColor} testID="arrow-icon" />}

      <Text weight="bold" size={'2xl'} testID="heading">
        {percentageString}
      </Text>
      <Text size={'sm'} testID="span" color="gray-700">
        of the meals within the diet
      </Text>
    </Container>
  )
}
