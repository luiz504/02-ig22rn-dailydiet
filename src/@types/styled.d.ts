/* eslint-disable @typescript-eslint/no-empty-interface */

import 'styled-components/native'
import { theme } from '~/styles'

type ThemeType = typeof theme

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
