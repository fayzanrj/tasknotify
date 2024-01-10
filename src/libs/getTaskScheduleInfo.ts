export const getTaskScheduleInfo = (selectedDate: string, time: string) : Date => {
  const selectedNewDate = new Date(selectedDate);
  const [hours, minutes] = time.split(":");

  const newDate = new Date(
    selectedNewDate.getFullYear(),
    selectedNewDate.getMonth(),
    selectedNewDate.getDate()
  );

  newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  console.log(newDate.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2])
  return newDate
};
