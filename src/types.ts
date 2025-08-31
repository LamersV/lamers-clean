export interface CapitalizeOptions {
  all: boolean;
}

export interface CleanOptions {
  trim: boolean;
  case: 'none' | 'lower' | 'upper';
  removeSpecial: boolean;
  removeJoiners: boolean;
  replace: ReplaceOptions[];
}

export interface ReplaceOptions {
  searchValue: string | RegExp;
  replaceValue: string;
  flags?: string;
}