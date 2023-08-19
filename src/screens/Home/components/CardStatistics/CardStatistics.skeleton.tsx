import { FC } from 'react'
import { Text } from '~/components/Text'

import { SkeletonContainer } from './styles'

import { useTheme } from 'styled-components/native'

export const CardStatisticsSkeleton: FC = () => {
  const theme = useTheme()

  return (
    <SkeletonContainer style={{ backgroundColor: theme.colors['gray-200'] }}>
      <Text weight="bold" size={'2xl'} testID="heading">
        --
      </Text>
      <Text size={'sm'} testID="span" color="gray-700">
        of the meals within the diet
      </Text>
    </SkeletonContainer>
  )
}
