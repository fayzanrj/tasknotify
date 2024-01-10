export const generateCode = (): string => {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  const code = Math.floor(Math.random() * (max - min + 1)) + min;
  return code.toString();
};
