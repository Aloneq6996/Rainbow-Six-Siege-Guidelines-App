import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStack";

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Settings"
>;

export type OperatorsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Operators"
>;

export type OperatorsListAttackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OperatorsListAttack"
>;

export type OperatorsListDefenseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OperatorsListDefense"
>;

export type OperatorsSpecificScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OperatorsSpecific"
>;

export type WeaponsListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WeaponsList"
>;

export type WeaponSpecificScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WeaponSpecific"
>;

export type SpecialGadgetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SpecialGadget"
>;
