import { FC, ReactNode } from 'react'
import { TouchableHighlightProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, Variant, Content, Label, Dot } from './styles'

interface ButtonProps extends TouchableHighlightProps {
  variant: Variant
  isSelected: boolean
  children: ReactNode
}
export const Button: FC<ButtonProps> = ({
  isSelected = false,
  variant,
  children,
  ...rest
}) => {
  const theme = useTheme()
  const underLayTheme: Record<Variant, string> = {
    green: theme.colors['green-500'],
    red: theme.colors['red-500'],
  }

  return (
    <Container
      variant={variant}
      isSelected={isSelected}
      {...rest}
      underlayColor={underLayTheme[variant]}
    >
      <Content testID="btn-content-wrapper">{children}</Content>
    </Container>
  )
}

export const Select = { Button, Label, Dot }
