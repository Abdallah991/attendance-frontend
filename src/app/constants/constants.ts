import { HttpHeaders } from '@angular/common/http';
import { SelectData } from '../interfaces/interfaces';
import { getToken } from './globalMethods';

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

export const bioTimeToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6IkFiZGFsbGFoIiwiZXhwIjoxNjgxMTEzMzMzLCJlbWFpbCI6ImFiZGFsbGFoLmFsYXRoYW1uZWhAcmVib290MDEuY29tIiwib3JpZ19pYXQiOjE2ODA1MDg1MzN9.vdjmAdVkf9mKRpla1l-TL-rSTUjwjy2lfh18OM2v43o';

export const httpOptionsBioTime = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + bioTimeToken,
  'Access-Control-Allow-Origin': '*',
});
