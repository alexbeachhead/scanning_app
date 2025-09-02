const pad = (num: number) => String(num).padStart(2, '0');

export const formatDateToDDMMYYYY = (dateString: string) => {
  const date = new Date(dateString);

  const utcDate = new Date(date.toISOString().split('T')[0]);
  const formattedDate = `${pad(utcDate.getUTCDate())}/${pad(utcDate.getUTCMonth() + 1)}/${utcDate.getUTCFullYear()}`;

  return formattedDate;
};

export function stringToDate(dateString: string) {
  const parts = dateString.split('-');
  const month = parseInt(parts[0], 10) - 1;
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}

export function addOneDay(date: Date) {
  date.setDate(date.getDate() + 1);

  return date;
}

export function getDateNDaysAgo(date: Date, days: number) {
  const newDate = new Date(date);

  newDate.setDate(newDate.getDate() - days);

  return newDate;
}

export const isValidDate = (dateString: string): boolean => {
  // Check if the input is a string and matches the format DD/MM/YYYY
  if (typeof dateString !== 'string' || !/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    return false;
  }

  // Split the string into day, month, and year
  const [day, month, year] = dateString.split('/').map(Number);

  // Check if the values are valid numbers
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return false;
  }

  // Create a Date object (note: months are 0-indexed in JavaScript)
  const date = new Date(year, month - 1, day);

  // Validate the date
  return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
};

export const isSameDate = (dateString1: string, dateString2: string) => {
  // Parse the date strings into Date objects
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // Extract year, month, and day from each date
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  // Compare year, month, and day
  return year1 === year2 && month1 === month2 && day1 === day2;
};

export function formatDateToISO(inputDate: string): string {
  // Split the input date into day, month, and year
  const [day, month, year] = inputDate.split('/').map(Number);

  // Create a Date object (note: months are 0-indexed in JavaScript, so subtract 1 from the month)
  const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); // Set time to 00:00:00 in UTC

  // Convert the Date object to an ISO string in UTC
  const isoString = date.toISOString();

  return isoString;
}

export const transformCardDateIntoISO = (input: string): string => {
  const [month, year] = input.split('/').map(part => parseInt(part));

  const fullYear = year < 50 ? 2000 + year : 1900 + year;

  const day = 31;

  const formattedDate = `${fullYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} 00:00:00`;

  return formattedDate;
};

export const transformISOToCardDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);

  return `${month}/${year}`;
};

export const formatDateTransactionDetails = (inputDate: string) => {
  const date = new Date(inputDate);

  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();

  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
