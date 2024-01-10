export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidName(name: string): boolean {
  const trimmedString: string = name.trim();
  const stringWithoutExtraSpaces: string = trimmedString.replace(/\s+/g, " ");
  return stringWithoutExtraSpaces.length >= 3;
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

export function isPasswordMatches(password: string, confirmPass: string) {
  return password === confirmPass;
}
