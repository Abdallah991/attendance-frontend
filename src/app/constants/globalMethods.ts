import { formatDate } from '@angular/common';
import { User } from '../models/User';
import { platformToken } from './api';

//  format date
export const formatYYYYDDMM = (date: Date): string =>
  formatDate(date, 'yyyy-MM-dd', 'en');

// get token
export const getToken = (): string => sessionStorage.getItem('signinToken');

// get 01 token
export const get01Token = (): string => platformToken;

// get User
export const getUser = (): User => JSON.parse(sessionStorage.getItem('user'));

// get UserId
export const getUserId = (): string => sessionStorage.getItem('userID');
