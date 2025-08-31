import { validateLink } from "../validate";
import { cleanString } from "../clean";

export const formatLink = (link: string | undefined): string => {
  if (!link) return '';

  if (!validateLink(link)) console.warn(`Invalid link: ${link}`);

  link = cleanString(link, {
    trim: true,
    case: 'none',
    removeSpecial: false,
    replace: [
      { searchValue: / /g, replaceValue: '' }
    ]
  });

  if (!link.startsWith('http')) link = `https://${link}`;
  return link;
}