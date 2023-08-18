import { format } from 'date-fns'

export function storageDateKeyFormat(date: Date): string {
  return format(date, 'yyyy/MM/dd')
}
