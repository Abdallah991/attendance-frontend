import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatYYYYDDMM } from 'src/app/constants/globalMethods';
import { Cohort } from 'src/app/models/Cohort';
import { Student } from 'src/app/models/Student';
// Calender imports
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  eventsPromise: Promise<EventInput>;

  // Caleder configuration
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    // add interactions plugin to allow click on date
    plugins: [dayGridPlugin, interactionPlugin],
    // handle date click
    dateClick: this.handleDateClick.bind(this),
    // handle event click
    eventClick: this.handleEventClick.bind(this),
    buttonText: {
      today: 'Today',
    },
  };
  constructor(private AR: ActivatedRoute, private renderer: Renderer2) {}

  // student data
  student: Student = null;
  // attendance data
  attendance: [] = [];
  // formatting Attendnace by frequency
  attendanceFormat: any = {};
  // formatting attendance to Full calendar
  attendanceTable: any[] = [];
  // frequency of Attendnace
  attendnaceRecords = 0;
  // cohort
  cohort: Cohort = null;
  // show toast
  toaster = false;
  // vacation taken by students
  vacations: [] = [];

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.student = response.student.data.student;
      // vacation data
      this.vacations = response.vacations.data.vacations;
      // cohort
      this.cohort = response.cohorts.data.cohorts[0];
      // Attendnace data
      this.attendance = response.attendance.data;
      // frequency counter to see how many times the students punches
      this.attendance.forEach((item) => {
        if (!this.attendanceFormat[formatYYYYDDMM(item['punch_time'])]) {
          this.attendanceFormat[formatYYYYDDMM(item['punch_time'])] = 1;
        } else {
          this.attendanceFormat[formatYYYYDDMM(item['punch_time'])]++;
        }
      });
      // looping over object to get the attendance number
      for (let properties in this.attendanceFormat) {
        this.attendnaceRecords++;
      }
      // ? testing
      // console.log(this.attendanceFormat);
      // console.log(this.attendnaceRecords);

      // format into an array for full calender
      Object.keys(this.attendanceFormat).forEach((item) => {
        this.attendanceTable.push({
          date: item,
          title: 'Present',
          color: '#06002E',
        });
      });
      // Add the vacations to full calender
      this.vacations.forEach((item) => {
        console.log(item);
        this.attendanceTable.push({
          start: item['startDate'],
          end: item['endDate'],
          color: '#FF002E',
          title: 'Vacation',
        });
      });
      // one time
      this.calendarOptions.events = this.attendanceTable;
    });
  }

  // ! TODO: copy email to clipboard
  copyEmail() {
    navigator.clipboard.writeText(this.student.email);
    // alert('Copied');
    this.toaster = true;
    setTimeout(() => {
      this.toaster = false;
    }, 3000);
  }

  // ! TODO: copy platformId to clipboard
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

  handleDateClick(arg) {
    // TODO: add a modal to be able to add a Vacation or maybe Attendance
    console.log(arg);
  }
  handleEventClick(arg) {
    // TODO: add event view, two types ATTENDANCE and VACATIONS
    // show event details
    console.log(arg.event);
    // this.deleteEventTitle = arg.event._def.title;
  }
}
