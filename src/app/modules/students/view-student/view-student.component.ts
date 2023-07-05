import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatYYYYDDMM } from 'src/app/constants/globalMethods';
import { Cohort } from 'src/app/models/Cohort';
import { Student } from 'src/app/models/Student';
// Calender imports
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  // Caleder configuration
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    buttonText: {
      today: 'Today',
    },
  };
  constructor(private AR: ActivatedRoute, private renderer: Renderer2) {}

  student: Student = null;
  attendance: [] = [];
  attendanceFormat: any = {};
  attendanceTable: any[] = [];
  attendnaceRecords = NaN;
  cohort: Cohort = null;
  toaster = false;

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.student = response.student.data.student;
      this.cohort = response.cohorts.data.cohorts[0];
      // Attendnace data
      this.attendance = response.attendance.data;
      // Attendnace frequency
      this.attendnaceRecords = response.attendance.count;
      // console.log(this.attendance);

      this.attendance.forEach((item) => {
        if (!this.attendanceFormat[formatYYYYDDMM(item['punch_time'])]) {
          this.attendanceFormat[formatYYYYDDMM(item['punch_time'])] = 1;
        } else {
          this.attendanceFormat[formatYYYYDDMM(item['punch_time'])]++;
        }
      });
      // console.log(this.attendanceFormat);
      // Attendnace dates and frequency on each day
      // formate into an array
      Object.keys(this.attendanceFormat).forEach((item) => {
        this.attendanceTable.push({
          date: item,
          title: 'Present',
          color: '#06002E',
          frequency: this.attendanceFormat[item],
          interactive: true,
          // url: 'Abdallah',
          // start: '2019-08-12T10:30:00',
        });
      });
      this.calendarOptions.events = this.attendanceTable;
      // console.log(this.attendanceTable);
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
