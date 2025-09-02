import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Routes } from "@utils/constants/navigation";

export interface RouteParamList extends ParamListBase {
  [Routes.Intro]: undefined;
  [Routes.SignIn]: undefined;
  [Routes.ForgotPassword]: undefined;
  [Routes.NewPassword]: undefined;
  [Routes.SignUp]: { email: string };
  [Routes.SignUpSuccess]: { screenType: "success" | "confirm" };
  [Routes.SignUpConfirmSuccess]: { screenType: "success" | "error" };
  [Routes.DeclarantsInfo]: {
    id?: string;
  };
  [Routes.NotificationsInfo]: {
    id: string;
  };
  [Routes.EditTrackNumber]: {
    id: string;
  };
  [Routes.ParcelInfo]: {
    id: string;
  };
  [Routes.ParcelStatus]: {
    id: string;
  };
  [Routes.EditParcelItem]: {
    id: string;
  };
  [Routes.EditParcelDelivery]: {
    id: string;
  };
  [Routes.AddBalance]: {
    callback?: () => void;
  };
  [Routes.AddEditAddress]: {
    id?: string;
  };
  [Routes.TransformedRequests]: {
    id: string;
  };
  [Routes.Application]: {
    id: string;
  };
  [Routes.NewParcelSuccessError]: {
    success: boolean;
  };
  [Routes.SharedScreenParcels]: {
    id: string;
    address_pvz?: string;
  };
}

declare global {
  type ScreenProps<T extends Routes> = NativeStackScreenProps<RouteParamList, T>;

  namespace ReactNavigation {
    interface RootParamList extends RouteParamList {}

    type RouteName = keyof typeof Routes;
  }
}
