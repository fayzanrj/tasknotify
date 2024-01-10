// function to add zero in the time string
export const addZero = (item: number): string => {
  return item.toString().length === 1 ? `0${item}` : `${item}`;
};

// Function to get time for edit task input field
export const getTime = (time: Date): string => {
  const hours = addZero(new Date(time).getHours());
  const minutes = addZero(new Date(time).getMinutes());

  return `${hours}:${minutes}`;
};

// Function to get time for edit task date input field
export const getDate = (date: string): string => {
  return date
    ? `${new Date(date).getFullYear()}-${addZero(
        new Date(date).getMonth() + 1
      )}-${addZero(new Date(date).getDate())}`
    : `${new Date().getFullYear()}-${addZero(
        new Date().getMonth() + 1
      )}-${addZero(new Date().getDate())}`;
};
