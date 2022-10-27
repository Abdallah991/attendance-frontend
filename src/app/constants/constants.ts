import { HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { getToken } from './globalMethods';

export const httpOptions = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + getToken(),
});
