import { getChangedProperties } from './getChangedProperties'

describe('getChangeProperties function', () => {
  const initialObject = {
    name: 'John Wick',
    dogIsAlive: true,
  }

  it('should return the changed properties', () => {
    const updatedObject = {
      ...initialObject,
      dogIsAlive: false,
    }

    const changes = getChangedProperties(initialObject, updatedObject)

    expect(changes).toEqual({ dogIsAlive: false })
  })

  it('should return null if there are no changed properties', () => {
    const updatedObject = {
      ...initialObject,
    }

    const changes = getChangedProperties(initialObject, updatedObject)

    expect(changes).toBeNull()
  })
})
