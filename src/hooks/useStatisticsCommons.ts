import { useMemo } from 'react'
import { useTheme } from 'styled-components/native'

import { percentageFormatter } from '~/utils/percentageFormatter'
import { isInDiet } from '~/utils/processMealsStatistics'

import { Statistics } from '~/models/Statistics'

export function useStatisticsCommons(statistics: Statistics | null) {
  const _theme = useTheme()

  const { theme, percentageString } = useMemo(() => {
    if (!statistics)
      return {
        theme: { backgroundColor: _theme.colors['gray-200'] },
        percentageString: '--',
      }

    const { inDietPercentage } = statistics

    const goodDiet = isInDiet(inDietPercentage)

    return {
      theme: {
        arrowColor: goodDiet
          ? _theme.colors['green-900']
          : _theme.colors['red-900'],
        backgroundColor: goodDiet
          ? _theme.colors['green-100']
          : _theme.colors['red-100'],
      },
      percentageString: percentageFormatter(inDietPercentage),
    }
  }, [statistics, _theme])

  return { percentageString, theme }
}
