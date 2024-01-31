import { HttpHeaders } from '@angular/common/http';
import { SelectData } from '../interfaces/interfaces';
import { getToken } from './globalMethods';
import { BehaviorSubject } from 'rxjs';

export const TOKENSUBJECT = new BehaviorSubject<string>(null);

// ! causing loading token problems after login
// * problem solved by creating object locally in each service
// export const httpOptions = new HttpHeaders({
//   'Content-Type': 'application/json',
//   Authorization: 'Bearer ' + getToken(),
// });

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

// modes
export const EDIT = 'EDIT';
export const ADD = 'ADD';

// application status pass or fail
export const APPLICANTS_STATUS: SelectData[] = [
  { id: 'pass', text: 'pass' },
  { id: 'fail', text: 'fail' },
  { id: 'all', text: 'all' },
];
// grades from
export const GRADES_START: SelectData[] = [
  { id: 'all', text: 'all' },
  { id: 0, text: '0' },
  { id: 5, text: '5' },
  { id: 10, text: '10' },
  { id: 15, text: '15' },
  { id: 20, text: '20' },
  { id: 25, text: '25' },
  { id: 30, text: '30' },
  { id: 35, text: '35' },
  { id: 40, text: '40' },
  { id: 45, text: '45' },
  { id: 50, text: '50' },
];

// grades to
export const GRADES_END: SelectData[] = [
  { id: 'all', text: 'all' },
  { id: 20, text: '20' },
  { id: 25, text: '25' },
  { id: 30, text: '30' },
  { id: 35, text: '35' },
  { id: 40, text: '40' },
  { id: 45, text: '45' },
  { id: 50, text: '50' },
  { id: 55, text: '55' },
  { id: 60, text: '60' },
  { id: 65, text: '65' },
  { id: 70, text: '70' },
  { id: 75, text: '75' },
  { id: 80, text: '80' },
  { id: 85, text: '85' },
];

// sorting
export const APPLICANTS_SORT: SelectData[] = [
  { id: 'ascending', text: 'ascending' },
  { id: 'descending', text: 'descending' },
];
// team constants
// ? migh be updated to json
export const TECH_TEAM = [
  'Ebrahim Hasan',
  'Abdallah Alathamneh',
  'Yaman Almasri',
];
export const OP_TEAM = ['Seham Yateem', 'Sarah Alhaffar', 'Melvis Silveira'];
export const MARKETING_TEAM = ['Donya Ali'];
export const BOSS = ['Yanal Jallad'];
export const TECH_ASSISTANCE = ['Amgad Ali', 'Hawra Faraj', 'Ahmed Abdeen'];
export const DECISION_MAKER = [
  'seham.yateem@reboot01.com',
  'abdallah.alathamneh@reboot01.com',
  'yanal.jallad@reboot01.com',
];

export const TEAM = [
  'abdallah.alathamneh@reboot01.com',
  'yanal.jallad@reboot01.com',
  'ebrahim.hasan@reboot01.com',
  'seham.yateem@reboot01.com',
  'dunya.ali@reboot01.com',
  'sarah.alhaffar@reboot01.com',
  'yaman.almasri@reboot01.com',
  'melvis.silveira@reboot01.com',
];

export const CODE_WARS = [
  'SameerAhmed',
  'iSolate77',
  'husainkarim',
  'Exortix',
  'Emahfoodh',
  'Abdallah991',
];

export const MARITAL_STATUS: SelectData[] = [
  { id: 1, text: 'Single' },
  { id: 2, text: 'Married' },
  { id: 3, text: 'Widow' },
  { id: 4, text: 'Divorced' },
];

export const HIGHEST_DEGREE: SelectData[] = [
  { id: 1, text: 'High School' },
  { id: 2, text: 'Bachelors' },
  { id: 3, text: 'Diploma' },
  { id: 4, text: 'Masters' },
  { id: 5, text: 'Phd' },
  { id: 6, text: 'Others' },
];

export const OCCUPATION: SelectData[] = [
  { id: 1, text: 'Student' },
  { id: 2, text: 'Employed' },
  { id: 3, text: 'Internship' },
  { id: 4, text: 'Job Seeker' },
  { id: 5, text: 'Entrepreneur' },
  { id: 6, text: 'Others' },
];

export const SPONSORSHIP: SelectData[] = [
  { id: 1, text: 'Tamkeen' },
  { id: 2, text: 'Personal' },
  { id: 3, text: 'Corporate' },
  { id: 4, text: 'Scholarship' },
];

export const YESNO: SelectData[] = [
  { id: 1, text: 'Yes' },
  { id: 2, text: 'No' },
];

export const SP: SelectData[] = [
  { id: 1, text: 'SP1' },
  { id: 2, text: 'SP2' },
  { id: 3, text: 'SP3' },
  { id: 4, text: 'SP4' },
];
