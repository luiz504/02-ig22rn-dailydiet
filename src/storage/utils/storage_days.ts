import AsyncStorage from '@react-native-async-storage/async-storage'
import { DAY_COLLECTION } from '../commons'

export async function getStoredDays() {
  return AsyncStorage.getItem(DAY_COLLECTION).then((storedData) =>
    storedData ? (JSON.parse(storedData) as string[]) : null,
  )
}

export async function setStoredDays(dayCollection: string[]) {
  return AsyncStorage.setItem(DAY_COLLECTION, JSON.stringify(dayCollection))
}
