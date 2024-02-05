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

export type SeasonData = {
  [key: string]: {
    seasonId: number;
    seasonName: string;
    seasonColor: string;
    seasonImage: string;
    seasonReleaseDate: string;
    regions: {
      [key: string]: {
        regionId: string;
        regionName: string;
        boards: {
          [key: string]: {
            boardId: string;
            boardName: string;
            skillMean: number;
            skillStdev: number;
            current: {
              id: number;
              name: string;
              mmr: number;
              icon: string;
            };
            max: {
              id: number;
              name: string;
              mmr: number;
              icon: string;
            };
            lastMatch: {
              result: string;
              mmrChange: number;
              skillMeanChange: number;
              skillStdevChange: number;
            };
            pastSeasons: {
              wins: number;
              losses: number;
              winRate: string;
              matches: number;
              abandons: number;
            };
            previousMmr: number;
            nextMmr: number;
            topRankPosition: number;
            kills: number;
            deaths: number;
            kd: number;
            wins: number;
            losses: number;
            winRate: string;
            matches: number;
            abandons: number;
            updateTime: string;
          };
        };
      };
    };
  };
};

export type NewsItemType = {
  abstract: string;
  categories: string[];
  content: string;
  date: string;
  id: string;
  readTime: number;
  tag: string;
  thumbnail: any;
  title: string;
  type: string;
  url: string;
};
