import { theme } from '~/styles'

export type ThemeVariant = 'white' | 'green' | 'gray' | 'red'

export const themeVariants: Record<ThemeVariant, string> = {
  gray: theme.colors['gray-300'],
  white: theme.colors['gray-100'],
  green: theme.colors['green-100'],
  red: theme.colors['red-100'],
} as const
