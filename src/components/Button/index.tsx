import { FC } from 'react'
import { TouchableHighlightProps } from 'react-native'

import TrashIcon from '~/assets/icons/trash.svg'
import PlusIcon from '~/assets/icons/plus.svg'
import PenLineIcon from '~/assets/icons/pen-line.svg'

import { useTheme } from 'styled-components/native'

import { Container, Content } from './styles'
import { Text } from '../Text'

type Variant = 'solid' | 'outline'

type VariantAttributes = {
  background: string
  underlayColor: string
  color: string
  borderColor?: string
}

type IconOption = 'trash' | 'plus' | 'pen'

interface ButtonProps extends TouchableHighlightProps {
  variant?: Variant
  label: string
  icon?: IconOption
}

export const Button: FC<ButtonProps> = ({
  variant = 'solid',
  icon,
  label,
  style,
  ...rest
}) => {
  const theme = useTheme()

  const variantTheme: Record<Variant, VariantAttributes> = {
    solid: {
      background: theme.colors['gray-700'],
      underlayColor: theme.colors['gray-800'],
      color: theme.colors.white,
      borderColor: theme.colors['gray-700'],
    },
    outline: {
      background: theme.colors['gray-100'],
      underlayColor: theme.colors['gray-300'],
      color: theme.colors['gray-800'],
      borderColor: theme.colors['gray-800'],
    },
  }

  const { background, color, underlayColor, borderColor } =
    variantTheme[variant]

  return (
    <Container
      {...rest}
      style={{ ...(style as object), backgroundColor: background, borderColor }}
      activeOpacity={1}
      underlayColor={underlayColor}
    >
      <Content testID="content">
        {icon && <IconRender type={icon} color={color} />}
        <Text size={'sm'} weight="bold" style={{ color }} testID="label">
          {label}
        </Text>
      </Content>
    </Container>
  )
}

type IconRenderProps = {
  type: IconOption
  color: string
}
function IconRender({ color, type }: IconRenderProps) {
  return (
    <>
      {type === 'pen' && (
        <PenLineIcon height={18} width={18} color={color} testID="pen-icon" />
      )}

      {type === 'plus' && (
        <PlusIcon height={18} width={18} color={color} testID="plus-icon" />
      )}

      {type === 'trash' && (
        <TrashIcon height={18} width={18} color={color} testID="trash-icon" />
      )}
    </>
  )
}
