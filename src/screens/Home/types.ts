import { Meal } from '~/models/Meal'

export type DailyMeals = {
  [ddmmyy: string]: Meal[]
}
