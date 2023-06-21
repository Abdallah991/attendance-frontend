import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatYYYYDDMM } from 'src/app/constants/globalMethods';
import { Cohort } from 'src/app/models/Cohort';
import { Student } from 'src/app/models/Student';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  [x: string]: any;
  constructor(private AR: ActivatedRoute) {}

  student: Student = null;
  attendance: [] = [];
  attendanceFormat: any = {};
  attendnaceRecords = NaN;
  cohort: Cohort = null;
  toaster = false;
  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.student = response.student.data.student;
      this.cohort = response.cohorts.data.cohorts[0];
      this.attendance = response.attendance.data;
      this.attendnaceRecords = response.attendance.count;
      console.log(this.attendance);

      this.attendance.forEach((item) => {
        if (!this.attendanceFormat[item['punch_time']]) {
          this.attendanceFormat[item['punch_time']] = 1;
        } else {
          this.attendanceFormat[item['punch_time']]++;
        }
      });
      console.log(this.attendanceFormat);
      // !Information to be added plus the attendance.
      // 1- cohort
      // 2- rank
      // 3- cpr
      // 4- dob
      // 5- nationality
      // 6- Scholarship
      // TODO: 7- Attendance
      // 8- school
      // 9- name
      // 10- id
      // 11- platform id
      // 12- email
      // TODO: 13- copy email, username or id shortcuts
    });
  }

  // TODO: copy email to clipboard
  copyEmail() {
    navigator.clipboard.writeText(this.student.email);
    // alert('Copied');
    this.toaster = true;
    setTimeout(() => {
      this.toaster = false;
    }, 3000);
  }

  // TODO: copy platformId to clipboard
  copyPlatformId() {
    navigator.clipboard.writeText(this.student.platformId);
    this.toaster = true;
    setTimeout(() => {
      this.toaster = false;
    }, 3000);
  }

  timeFormatter(date) {
    return formatYYYYDDMM(date);
  }
}
