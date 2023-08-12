import { render, screen } from '~/utils/test-utils'

import { HeaderUserLogo } from '.'

describe('HeaderUserLogo Component', () => {
  it('should render correctly', () => {
    render(<HeaderUserLogo />)

    expect(screen.getByTestId('header-user-logo').props.style).toMatchSnapshot(
      'container-styles',
    )

    expect(screen.getByTestId('logo')).toBeOnTheScreen()
    expect(screen.getByTestId('profile').props.style).toMatchSnapshot(
      'profile-styles',
    )
  })
})
