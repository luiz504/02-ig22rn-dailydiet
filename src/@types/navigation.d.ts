import { Statistics } from "~/models/Statistics";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      "new-diet": undefined;
      statistics: {
        statistics: Statistics
      };
    }
  }
}
