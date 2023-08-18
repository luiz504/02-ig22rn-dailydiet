import { format, parse } from 'date-fns'

const FORMAT = 'yyyy/MM/dd'
export function storageDateKeyFormat(date: Date): string {
  return format(date, FORMAT)
}

export function storageKeyToDateParse(key: string) {
  return parse(key, FORMAT, new Date())
}
