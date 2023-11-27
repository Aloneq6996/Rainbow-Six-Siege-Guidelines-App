export type Operator = {
  id: number;
  role: string;
  name: string;
  surname: string;
  nickname: string;
  counters: string[];
  counteredBy: string[];
  image: string;
};
export type WeaponPrimary = {
  id: number;
  name: string;
  type: string;
  damage: number;
  operators: string[];
  attachments: Record<string, any>;
  image: string;
};

export type WeaponSecondary = {
  id: number;
  name: string;
  type: string;
  damage: number;
  operators: string[];
  attachments: {
    barrels: string[];
    underbarrel: string[];
    extra?: {
      scopes: string[];
      grip: string[];
    };
  };
  image: string;
};

export type SpecialGadget = {
  id: number;
  name: string;
  type: string;
  description: string;
  quantity: string;
  operator: string;
  image: string;
};

export type UniGadget = {
  id: number;
  name: string;
  type: string;
  description: string;
  quantity: number;
  operators: string[];
  image: string;
};
