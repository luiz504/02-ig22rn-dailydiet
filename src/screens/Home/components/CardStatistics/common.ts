import { useMemo } from 'react'
import { useTheme } from 'styled-components/native'
import { Statistics } from '~/models/Statistics'
import { percentageFormatter } from '~/utils/percentageFormatter'

export function useStatisticsCommons(statistics: Statistics) {
  const { inDietPercentage } = statistics

  const { inDiet, percentageString } = useMemo(
    () => ({
      inDiet: inDietPercentage >= 75,
      percentageString: percentageFormatter(inDietPercentage),
    }),
    [inDietPercentage],
  )

  const _theme = useTheme()

  const theme = useMemo(
    () => ({
      arrowColor: inDiet
        ? _theme.colors['green-900']
        : _theme.colors['red-900'],
      backgroundColor: inDiet
        ? _theme.colors['green-100']
        : _theme.colors['red-100'],
    }),
    [inDiet, _theme],
  )

  return { percentageString, theme }
}
