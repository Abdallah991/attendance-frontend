import { HttpHeaders } from '@angular/common/http';
import { SelectData } from '../interfaces/interfaces';
import { get01Token, getToken } from './globalMethods';
import { platformToken } from './api';

export const httpOptions = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + getToken(),
});

export const GENDERS: SelectData[] = [
  { id: 'Male', text: 'Male' },
  { id: 'Female', text: 'Female' },
  { id: 'Rather not say', text: 'Rather not say' },
];

export const SUPPORTED_BY_TAMKEEN: SelectData[] = [
  { id: 'Yes', text: 'Yes' },
  { id: 'No', text: 'No' },
];

// TODO : Create the APIs and models for it
export const PERMISSIN: SelectData[] = [
  { id: 'Admin', text: 'Admin' },
  { id: 'Operation', text: 'No' },
];

export const bioTimeToken = '48e111ccd207225fff4b28cc5f7e6d68acf6b479';

export const httpOptionsBioTime = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + bioTimeToken,
  'Access-Control-Allow-Origin': '*',
});

export const http01Options = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + platformToken,
  // Content-Type: 'charset=utf-8',
  // 'Access-Control-Allow-Origin': '*',
});
