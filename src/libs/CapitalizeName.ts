export const CapitalizeName = (name: string): string => {
  // Removing extra spaces
  const trimmedString: string = name.trim();
  const stringWithoutExtraSpaces: string = trimmedString.replace(/\s+/g, " ");

  // Captalizing the first letter of each word and making remaining lowercase
  const nameArray: string[] = stringWithoutExtraSpaces.split(" ");
  const capitalizedArray: string[] = nameArray.map(
    (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  const capitalizedString: string = capitalizedArray.join(" ");

  return capitalizedString;
};
