import { Meal } from "~/models/Meal";
import { Statistics } from "~/models/Statistics";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      "new-meal": undefined;
      statistics: {
        statistics: Statistics
      };
      meal: {
        meal: Meal
        groupName: string
      }
      'edit-meal': {
        meal: Meal,
        groupName: string
      }
      'success-meal-creation': {
        inDiet: boolean
      }
    }
  }
}
