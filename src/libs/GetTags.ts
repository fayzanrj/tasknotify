export const getTags = (tasgString: string): string[] => {
    const splitArray: string[] = tasgString.split(",");
  
    // Removing whitespaces from each element
    const resultArray: string[] = splitArray.map((element) => element.trim());
    return resultArray;
  };
  