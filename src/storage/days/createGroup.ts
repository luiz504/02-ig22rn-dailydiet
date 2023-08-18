import { endOfDay, subMonths } from 'date-fns'
import { z } from 'zod'

import { storageDateKeyFormat } from '../utils/storageDateKeyFormat'
import { getStoredDays, setStoredDays } from '../utils/storage_days'
import { sortDays } from '../utils/sortDays'

export const dateSchema = z
  .date({ required_error: 'Date is required' })
  .min(subMonths(new Date(), 1), {
    message: 'Max 1 mouth passed allowed to create new entries',
  })
  .max(endOfDay(new Date()), {
    message: 'Unable to create entries to the next Day',
  })

export const createDay = async (date: Date) => {
  dateSchema.parse(date)

  const storedDays = await getStoredDays()

  const parsedDayKey = storageDateKeyFormat(date)

  if (!storedDays) {
    await setStoredDays([parsedDayKey])
    return
  }

  if (storedDays.includes(parsedDayKey)) return

  const sortedDays = sortDays([...storedDays, parsedDayKey])

  await setStoredDays(sortedDays)
}
