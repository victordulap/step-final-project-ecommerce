export const formatToDateTime = (date) => {
  if (typeof date === 'string') date = new Date(date);

  let [month, day, year] = [getLeadingZero(date.getMonth() + 1), getLeadingZero(date.getDate()), getLeadingZero(date.getFullYear())];
  let [hour, minutes] = [getLeadingZero(date.getHours()), getLeadingZero(date.getMinutes())];

  return `${day}/${month}/${year} ${hour}:${minutes}`;
};

const getLeadingZero = (number) => ('0' + number).slice(-2);
