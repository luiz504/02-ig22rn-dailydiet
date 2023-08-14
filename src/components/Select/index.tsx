import { FC, ReactNode } from 'react'
import { PressableProps } from 'react-native'

import { Container, Variant, Label, Dot } from './styles'

interface ButtonProps extends PressableProps {
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
  return (
    <Container
      variant={variant}
      isSelected={isSelected}
      {...rest}
      android_ripple={{ color: 'rgba(0,0,0, 0.06)' }}
    >
      {children}
    </Container>
  )
}

export const Select = { Button, Label, Dot }
