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
