import { getStoredDays, setStoredDays } from '../utils/storage_days'
import { z } from 'zod'

const dateKeySchema = z.string().nonempty()
export async function deleteDayRegister(dateKey: string) {
  dateKeySchema.parse(dateKey)

  const storedDays = await getStoredDays()

  if (!storedDays) return

  const filteredDays = storedDays.filter((d) => d !== dateKey)

  if (filteredDays.length === storedDays.length) return

  await setStoredDays(filteredDays)
}
