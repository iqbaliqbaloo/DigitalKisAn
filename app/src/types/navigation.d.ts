import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  LoginBuyer: undefined;
  BuyerRegister: undefined;
};

export type LoginBuyerNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "LoginBuyer"
>;

export type BuyerRegisterNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "BuyerRegister"
>;
