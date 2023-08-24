import { FC } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'

import { Button } from '~/components/Button'
import { Text } from '~/components/Text'

import { Container } from './styles'

import InDietSvg from '~/assets/illustration-in-diet.svg'
import OutOfDietSvg from '~/assets/illustration-out-of-diet.svg'

type RouteParams = {
  inDiet: boolean
}

export const SuccessMealCreation: FC = () => {
  const { inDiet } = useRoute().params as RouteParams
  const { navigate } = useNavigation()
  const theme = useTheme()

  const headingColor = inDiet
    ? theme.colors['green-900']
    : theme.colors['red-900']

  const headingText = inDiet ? 'Keep it up!' : 'What a shame!'

  return (
    <Container>
      <Text
        size="xl"
        weight="bold"
        style={{ marginBottom: 8, color: headingColor }}
        testID="heading"
      >
        {headingText}
      </Text>

      {inDiet ? (
        <Text style={{ marginBottom: 40 }} testID="sub-heading">
          You&apos;re still <Text weight="bold">on track with your diet.</Text>
          Very Good!
        </Text>
      ) : (
        <Text style={{ marginBottom: 40 }} testID="sub-heading">
          You <Text weight="bold">went off the diet</Text> this time, but keep
          putting in effort and don&apos;t give up!
        </Text>
      )}

      {inDiet ? (
        <InDietSvg testID="in-diet-svg" />
      ) : (
        <OutOfDietSvg testID="out-diet-svg" />
      )}

      <Button
        label="Go to the homepage"
        onPress={() => navigate('home')}
        style={{ marginTop: 32 }}
        testID="btn-go-home"
      />
    </Container>
  )
}
