import { CleanOptions, ReplaceOptions } from "../types";

export const cleanString = (str: string, options?: Partial<CleanOptions>): string => {
  const _options: CleanOptions = {
    trim: options?.trim ?? true,
    case: options?.case ?? 'none',
    removeSpecial: options?.removeSpecial ?? false,
    removeJoiners: options?.removeJoiners ?? false,
    replace: options?.replace ?? [],
  };

  let result = str.normalize('NFD').replace(/\p{Diacritic}/gu, '');

  if (_options.removeSpecial) {
    result = result.replace(/[^a-zA-Z0-9]/g, ' ');
  }

  if (_options.removeJoiners) {
    result = cleanJoiners(result);
  }

  for (const replaceOptions of _options.replace) {
    result = replaceString(result, replaceOptions);
  }

  if (_options.case !== 'none') {
    result = _options.case === 'lower' ? result.toLowerCase() : result.toUpperCase();
  }

  result = result.replace(/\s+/g, ' ');

  if (_options.trim) {
    result = result.trim();
  }

  return result;
};

const replaceString = (str: string, options: ReplaceOptions): string => {
  const { searchValue, replaceValue, flags } = options;
  const regex = searchValue instanceof RegExp ? searchValue : new RegExp(searchValue, flags);

  return str.replace(regex, replaceValue);
};

const cleanJoiners = (str: string): string => {
  const joiners = ['da', 'de', 'do', 'dos', 'das', 'a', 'e', 'em', 'd', 'na', 'no', 'nos', 'nas', 'com', 'por'];
  const regex = new RegExp(`\\b(${joiners.join('|')})\\b`, 'gi');
  return str.replace(regex, (match) => match.toLowerCase());
}
