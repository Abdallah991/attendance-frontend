import { formatDate } from '@angular/common';
import { User } from '../models/User';

//  format date
export const formatYYYYDDMM = (date: Date): string =>
  formatDate(date, 'yyyy-MM-dd', 'en_US');

// get token
export const getToken = (): string => sessionStorage.getItem('signinToken');

// get User
export const getUser = (): User => JSON.parse(sessionStorage.getItem('user'));

// get UserId
export const getUserId = (): string => sessionStorage.getItem('userID');
