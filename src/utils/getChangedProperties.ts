export function getChangedProperties<T extends object>(
  oldObject: T,
  newObject: Partial<T>,
): Partial<T> | null {
  const changedProperties: Partial<T> = {}

  for (const key in newObject) {
    if (oldObject[key] !== newObject[key]) {
      changedProperties[key] = newObject[key]
    }
  }

  return Object.keys(changedProperties).length ? changedProperties : null
}
