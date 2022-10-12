import { formatDate } from '@angular/common';

//  format date
export const formatYYYYDDMM = (date: Date): string =>
  formatDate(date, 'yyyy-MM-dd', 'en_US');
