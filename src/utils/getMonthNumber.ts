import { MonthType } from '../types';

const getMonthNumber = (month: MonthType): string => {
  let number: string = '';

  if (month === 'January') {
    number = '01';
  } else if (month === 'February') {
    number = '02';
  } else if (month === 'March') {
    number = '03';
  } else if (month === 'April') {
    number = '04';
  } else if (month === 'May') {
    number = '05';
  } else if (month === 'June') {
    number = '06';
  } else if (month === 'July') {
    number = '07';
  } else if (month === 'August') {
    number = '08';
  } else if (month === 'September') {
    number = '09';
  } else if (month === 'October') {
    number = '10';
  } else if (month === 'November') {
    number = '11';
  } else if (month === 'December') {
    number = '12';
  }

  return number;
};

export default getMonthNumber;
