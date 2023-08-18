export const sortDays = (array: string[]) => {
  return array.sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime()
  })
}
