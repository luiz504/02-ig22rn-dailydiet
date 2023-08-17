import { FC } from 'react'

import LogoFull from '~/assets/logo-full.svg'

import ImageProfile from './profile.png'

import { Container, ProfileWrapper, ProfileImage } from './styles'

export const HeaderUserLogo: FC = () => {
  return (
    <Container testID="header-user-logo">
      <LogoFull testID="logo" />

      <ProfileWrapper testID="profile">
        <ProfileImage source={ImageProfile} alt="" />
      </ProfileWrapper>
    </Container>
  )
}
