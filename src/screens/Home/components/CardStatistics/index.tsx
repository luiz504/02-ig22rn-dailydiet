import { FC, useEffect } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import { useStatisticsCommons } from './common'

import { Text } from '~/components/Text'

import {
  AnimatedWrapper,
  Container,
  ContentAnimated,
  ArrowIcon,
} from './styles'

import { Statistics } from '~/models/Statistics'

interface CardStatistics extends TouchableOpacityProps {
  statistics: Statistics
}

export const CardStatistics: FC<CardStatistics> = ({ statistics, testID }) => {
  const {
    percentageString,
    theme: { arrowColor, backgroundColor },
  } = useStatisticsCommons(statistics)

  const navigator = useNavigation()

  const isVisible = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: isVisible.value,
  }))

  const handleNavigate = () => {
    isVisible.value = 0
    navigator.navigate('statistics', { statistics })
  }

  useEffect(() => {
    const unsubscribe = navigator.addListener('focus', () => {
      isVisible.value = 1
    })
    return unsubscribe
  }, [navigator, isVisible])

  return (
    <AnimatedWrapper sharedTransitionTag="tag" testID={'animated-wrapper'}>
      <Container
        style={{ backgroundColor }}
        testID={testID}
        onPress={handleNavigate}
      >
        <ContentAnimated style={animatedStyle} testID={'content-animated'}>
          <ArrowIcon color={arrowColor} testID="arrow-icon" />
          <Text weight="bold" size={'2xl'} testID="heading">
            {percentageString}
          </Text>
          <Text size={'sm'} testID="span" color="gray-700">
            of the meals within the diet
          </Text>
        </ContentAnimated>
      </Container>
    </AnimatedWrapper>
  )
}
