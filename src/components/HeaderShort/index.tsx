import { FC } from 'react'
import { useTheme } from 'styled-components/native'

import ArrowLeft from '~/assets/icons/arrow-left.svg'

import { Text } from '../Text'

import { Container, BtnReturn } from './styles'

type HeaderShortProps = {
  onReturnRequest: () => void
  title: string
  disabledReturn?: boolean
}

export const HeaderShort: FC<HeaderShortProps> = ({
  onReturnRequest,
  title,
  disabledReturn,
}) => {
  const theme = useTheme()
  return (
    <Container>
      <BtnReturn
        onPress={onReturnRequest}
        testID="btn-return"
        disabled={disabledReturn}
      >
        <ArrowLeft color={theme.colors['gray-700']} testID="arrow-left-icon" />
      </BtnReturn>

      <Text size="lg" weight="bold">
        {title}
      </Text>
    </Container>
  )
}
