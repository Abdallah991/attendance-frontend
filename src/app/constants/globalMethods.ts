import { formatDate } from '@angular/common';
import { User } from '../models/User';
import { platformToken } from './api';
import moment from 'moment';

//  format date
export const formatYYYYDDMM = (date: Date): string =>
  formatDate(date, 'yyyy-MM-dd', 'en');

export const formatYYYYDDMMHHMM = (date: Date): string =>
  formatDate(date, 'yyyy-MM-dd HH:mm', 'en');

// get token
export const getToken = (): string => sessionStorage.getItem('signinToken');

// get 01 token
export const get01Token = (): string => platformToken;

// get User
export const getUser = (): User => JSON.parse(sessionStorage.getItem('user'));

// get UserId
export const getUserId = (): string => sessionStorage.getItem('userID');
//! date functions
// get current Date
export const getCurrentDate = (): string =>
  moment().format('YYYY-MM-DD') + 'T00:00:00.000Z';
// get the date before 7 days
export const getDate7Days = (): string =>
  moment().subtract(7, 'days').format('YYYY-MM-DD') + 'T00:00:00.000Z';
// get the date of tomorrow
export const getDateTomorrow = (): string =>
  moment().add(1, 'days').format('YYYY-MM-DD') + 'T00:00:00.000Z';

// get yesterday's date
export const getDateYesterday = (): string =>
  moment().subtract(1, 'days').format('YYYY-MM-DD') + 'T00:00:00.000Z';

export const toTimestamp = (strDate) => {
  const dt = Date.parse(strDate);
  return dt / 1000;
};
