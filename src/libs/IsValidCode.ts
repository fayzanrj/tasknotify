export const isValidCode = (code: string): boolean => {
  const codePattern = /^[0-9]+$/;
  return codePattern.test(code);
};
