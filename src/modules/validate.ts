import { cleanString } from "./clean";

export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  const calculateCheckDigit = (factor: number) => {
    const sum = cpf
      .slice(0, factor - 1)
      .split('')
      .reduce((acc, digit, index) => acc + parseInt(digit) * (factor - index), 0);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return calculateCheckDigit(10) === parseInt(cpf[9]) && calculateCheckDigit(11) === parseInt(cpf[10]);
};

export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calculateCheckDigit = (length: number) => {
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += parseInt(cnpj[length - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    return sum % 11 < 2 ? 0 : 11 - (sum % 11);
  };

  return calculateCheckDigit(12) === parseInt(cnpj[12]) && calculateCheckDigit(13) === parseInt(cnpj[13]);
};

export const validateEmail = (email: string): boolean => {
  const emailcleared = cleanString(email, {
    trim: true,
    case: 'lower',
    removeSpecial: false,
    replace: [
      { searchValue: / /g, replaceValue: '' }
    ]
  });

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailcleared);
};

export const validateLink = (link: string): boolean => {
  if (!link) return false;

  const linkcleared = cleanString(link, {
    trim: true,
    case: 'none',
    removeSpecial: false,
    replace: [
      { searchValue: /:/g, replaceValue: '' }
    ]
  });

  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(linkcleared);
}