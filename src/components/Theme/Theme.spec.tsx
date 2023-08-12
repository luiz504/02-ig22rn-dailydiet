import { Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { render, screen } from '~/utils/test-utils'

import { ThemeVariant, themeVariants } from './constants'
import { Theme } from '.'

describe('Theme Component', () => {
  const themeVariantsKeys = Object.keys(themeVariants)

  it('should render correctly with the default variant', () => {
    render(
      <Theme>
        <Text>anything</Text>
      </Theme>,
    )

    const containerElement = screen.getByTestId('theme-container')
    expect(containerElement).toBeOnTheScreen()
    expect(containerElement.props.style).toMatchSnapshot(
      `container-style-default`,
    )

    const statusBarElement = screen.UNSAFE_getByType(StatusBar)
    expect(statusBarElement).toBeOnTheScreen()
    expect(statusBarElement.props).toMatchSnapshot()
  })

  themeVariantsKeys.forEach((variant) => {
    it(`should render correctly with the a variant assigned`, () => {
      render(
        <Theme variant={variant as ThemeVariant}>
          <Text>anything</Text>
        </Theme>,
      )

      const containerElement = screen.getByTestId('theme-container')
      expect(containerElement.props.style).toMatchSnapshot(
        `container-style-variant=${variant}`,
      )
    })
  })
})
