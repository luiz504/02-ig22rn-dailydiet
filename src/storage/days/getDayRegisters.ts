import { getStoredDays } from '../utils/storage_days'

export async function getDaysRegisters() {
  return await getStoredDays()
}
