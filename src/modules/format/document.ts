import { validateCNPJ, validateCPF } from "../validate";

export const toCNPJ = (cnpj: string): string => {
  if (!cnpj) return "";

  if (!validateCNPJ(cnpj)) {
    console.warn(`Invalid CNPJ: ${cnpj}`);
    return cnpj;
  }

  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

export const toCPF = (cpf: string): string => {
  if (!cpf) return "";

  if (!validateCPF(cpf)) {
    console.warn(`Invalid CPF: ${cpf}`);
    return cpf;
  }

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};