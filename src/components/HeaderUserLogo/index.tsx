import { FC } from 'react'

import { Container, ProfileWrapper } from './styles'

import LogoFull from '~/assets/logo-full.svg'

export const HeaderUserLogo: FC = () => {
  return (
    <Container testID="header-user-logo">
      <LogoFull testID="logo" />

      <ProfileWrapper testID="profile" />
    </Container>
  )
}
