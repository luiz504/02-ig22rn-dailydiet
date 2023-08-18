import '@testing-library/jest-native/extend-expect'
import 'jest-styled-components'

// eslint-disable-next-line
require('expo-localization').locale = 'en-US'

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)
