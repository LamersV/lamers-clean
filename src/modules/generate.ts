export const generateTimestamp = () => new Date().getTime().toString();

export const generateRandomCode = (length: number = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export const generateRandomPassword = (length: number = 10) => {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%&*?';

  let password = '';

  password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
  password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));

  for (let i = 4; i < length; i++) {
    const chars = upperCase + lowerCase + numbers;
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  password = password.split('').sort(() => Math.random() - 0.5).join('');

  return password;
}