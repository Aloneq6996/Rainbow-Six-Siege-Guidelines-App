export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Operators: undefined;
  OperatorsListAttack: undefined;
  OperatorsListDefense: undefined;
  OperatorsSpecific: { operatorName: string };
  MapList: undefined;
  MapSpecific: { mapName: string };
  WeaponsList: undefined;
  WeaponSpecific: { weaponName: string };
  SpecialGadget: { gadgetName: string };
  Statistics: undefined;
  News: undefined;
  IndividualNews: { newsId: string };
};
