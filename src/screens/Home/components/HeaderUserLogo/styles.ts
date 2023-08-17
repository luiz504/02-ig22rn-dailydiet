import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 24px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const ProfileWrapper = styled.View`
  height: 40px;
  width: 40px;
  overflow: hidden;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors['gray-700']};
`
export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
