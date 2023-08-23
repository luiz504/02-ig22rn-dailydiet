import { FC } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import ArrowLeft from '~/assets/icons/arrow-left.svg'

import { useStatisticsCommons } from '~/hooks/useStatisticsCommons'

import { Text } from '~/components/Text'

import {
  Container,
  Header,
  ArrowBtn,
  DetailsSection,
  Card,
  DetailsRow,
} from './styles'

import { Statistics } from '~/models/Statistics'

type RouteParams = {
  statistics: Statistics
}
export const StatisticsScreen: FC = () => {
  const { statistics } = useRoute().params as RouteParams
  const navigator = useNavigation()

  const { bestInDietSequence, totalEntries, inDietEntries, outDietEntries } =
    statistics
  const {
    theme: { arrowColor, backgroundColor },
    percentageString,
  } = useStatisticsCommons(statistics)

  const handleNavigate = () => {
    navigator.navigate('home')
  }

  return (
    <Container style={{ backgroundColor }}>
      <Header>
        <ArrowBtn onPress={handleNavigate} testID="btn-return">
          <ArrowLeft color={arrowColor} />
        </ArrowBtn>

        <Text weight="bold" size={'2xl'}>
          {percentageString}
        </Text>

        <Text size={'sm'} color="gray-700">
          of the meals within the diet
        </Text>
      </Header>

      <DetailsSection>
        <Text size="sm" weight="bold" style={{ marginBottom: 11 }}>
          General Statistics
        </Text>

        <Card variant="gray">
          <Text size="xl" weight="bold" style={{ marginBottom: 11 }}>
            {bestInDietSequence}
          </Text>

          <Text size={'sm'} color="gray-700">
            optimal sequence of dishes within the diet.
          </Text>
        </Card>

        <Card variant="gray">
          <Text size="xl" weight="bold" style={{ marginBottom: 11 }}>
            {totalEntries}
          </Text>

          <Text size={'sm'} color="gray-700">
            recorded meals.
          </Text>
        </Card>

        <DetailsRow>
          <Card variant="green">
            <Text size="xl" weight="bold" style={{ marginBottom: 11 }}>
              {inDietEntries}
            </Text>

            <Text size={'sm'} color="gray-700">
              meals within the diet
            </Text>
          </Card>

          <Card variant="red">
            <Text size="xl" weight="bold" style={{ marginBottom: 11 }}>
              {outDietEntries}
            </Text>

            <Text size={'sm'} color="gray-700">
              meals outside the diet
            </Text>
          </Card>
        </DetailsRow>
      </DetailsSection>
    </Container>
  )
}
