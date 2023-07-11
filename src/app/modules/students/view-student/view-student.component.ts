import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatYYYYDDMM } from 'src/app/constants/globalMethods';
import { Cohort } from 'src/app/models/Cohort';
import { Student } from 'src/app/models/Student';
// Calender imports
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { VacationComponent } from 'src/app/components/vacation/vacation.component';
import { VacationsService } from '../services/vacations.service';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
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

  // dialog form group
  // form: FormGroup;
  constructor(
    private AR: ActivatedRoute,
    public dialog: MatDialog,
    private VS: VacationsService
  ) {}

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
        this.attendanceTable.push({
          start: item['startDate'],
          end: item['endDate'],
          color: '#FF002E',
          title: 'Vacation',
        });
      });
      // TODO: calculate time of students for each day
      // console.log('value of attendance', this.attendance);
      // console.log('value of attendance format', this.attendanceFormat);
      // console.log('value of attendance table', this.attendanceTable);
      // one time
      this.calendarOptions.events = this.attendanceTable;
    });
  }

  // ! TODO: copy email to clipboard
  copyEmail() {
    navigator.clipboard.writeText(this.student.email);
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
    // TODO: Scrolling happened because dialog ruins the side nav style
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    // set time out for dialog to appear
    setTimeout(() => {
      //  show dialog
      const dialogRef = this.dialog.open(VacationComponent, {
        height: '58vh',
        width: '70vw',
        data: { student: this.student, startDate: arg.dateStr },
      });
      // what happens afer dialog finishes
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed', result);
        this.attendanceTable = [
          this.attendanceFormat,
          {
            start: result['startDate'],
            end: result['endDate'],
            color: '#FF002E',
            title: 'Vacation',
          },
        ];
        this.addVacation(result);
      });
    }, 700);
  }

  handleEventClick(arg) {
    // TODO: add event view, two types ATTENDANCE and VACATIONS
    // show event details
    console.log(arg.event);
    // this.deleteEventTitle = arg.event._def.title;
  }

  // API post and modifying the calender
  addVacation(vacation) {
    // add vacation to the attendance table
    this.VS.addVacation(vacation)
      .then((val) => {
        console.log(val);
        this.calendarOptions.events = [...this.attendanceTable];
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
