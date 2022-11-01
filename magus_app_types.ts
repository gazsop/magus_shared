import { shared_LISTOF_POST_REQ_TYPES } from "./magus_app_constants";

export type shared_TListOfTypes =
  typeof shared_LISTOF_POST_REQ_TYPES[keyof typeof shared_LISTOF_POST_REQ_TYPES];

export interface shared_IResponseData {
  error?: boolean;
  errorMsg?: string | null;
  data?: Record<string, string>[] | Record<string, string> | null;
}

export interface shared_IRequestData {
  type: shared_TListOfTypes;
  data?: Record<string, string>[] | Record<string, string>;
}

export type shared_TCharacterAdvantureData = {
  id: number;
  lastLogin: Date;
};

export type shared_TAdvanture = {
  advantureId: number;
  name: string;
  time: Date;
  status: "combat" | "end";
  combatTimer: number;
  characters: Array<shared_TCharacterAdvantureData>;
  xpCaps: number[];
};

export type shared_TDice = 4 | 6 | 10 | 12 | 20;

export interface shared_IError {
  msg: string;
  url: string;
  lineNo: string;
  columnNo: string;
  error: string;
}
