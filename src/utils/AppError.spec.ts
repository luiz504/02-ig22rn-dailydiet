import { AppError } from './AppError'

describe('AppError Class', () => {
  it('should have the correct message', () => {
    const errorMsg = 'Some Error Message'

    const error = new AppError(errorMsg)

    expect(error.message).toEqual(errorMsg)
  })
})
