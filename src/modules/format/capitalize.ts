import { CapitalizeOptions } from "src/types";

export const capitalize = (text: string, options?: CapitalizeOptions): string => {
  const joiners = ['da', 'de', 'do', 'dos', 'das', 'e', 'em', 'd', 'na', 'no', 'por', 'nas', 'nos'];

  const capitalizeWord = (word: string): string => {
    if (word.length === 1) return word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  if (options?.all) {
    return text
      .split(' ')
      .map((word, index) => {
        const lowerWord = word.toLowerCase();
        if (joiners.includes(lowerWord) && index !== 0) {
          return lowerWord;
        }
        return capitalizeWord(word);
      })
      .join(' ');
  }
  else {
    return capitalizeWord(text);
  }
};