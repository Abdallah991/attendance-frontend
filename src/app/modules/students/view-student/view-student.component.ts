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
import { ADD, EDIT } from 'src/app/constants/constants';
import { StudentsService } from '../services/students.service';

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
    private VS: VacationsService,
    private router: Router,
    private SS: StudentsService
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
  // confirmation dialog
  dialogTitle = 'Updating the student status ...';
  message = 'Add your notes';
  button = 'Dismiss';
  button2 = 'Confirm';

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.student = response.student.data.student;
      // vacation data
      this.vacations = response.vacations.data.vacations;
      // cohort
      this.cohort = response.cohorts.data.cohorts[0];
      // Attendnace data
      this.attendance = response.attendance.data;
      console.log(this.attendance);
      // frequency counter to see how many times the students punches
      // TODO:add the time when there is multiple occurences
      // TODO: set a default time when there is on occurance
      this.attendance.forEach((item) => {
        if (!this.attendanceFormat[formatYYYYDDMM(item['punch_time'])]) {
          this.attendanceFormat[formatYYYYDDMM(item['punch_time'])] = 1;
        } else {
          this.attendanceFormat[formatYYYYDDMM(item['punch_time'])]++;
        }
      });
      // looping over object to get the attendance days
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
          id: item['id'],
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

  // ! Disabled: copy email to clipboard
  // copyEmail() {
  //   navigator.clipboard.writeText(this.student.email);
  //   this.toaster = true;
  //   setTimeout(() => {
  //     this.toaster = false;
  //   }, 3000);
  // }

  // ! Disabled: copy platformId to clipboard
  // copyPlatformId() {
  //   navigator.clipboard.writeText(this.student.platformId);
  //   this.toaster = true;
  //   setTimeout(() => {
  //     this.toaster = false;
  //   }, 3000);
  // }

  // time formatter for date birth
  timeFormatter(date) {
    return formatYYYYDDMM(date);
  }

  // add vacation
  handleDateClick(arg) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    // set time out for dialog to appear to not distrubt the UI
    setTimeout(() => {
      //  show dialog
      const dialogRef = this.dialog.open(VacationComponent, {
        height: '58vh',
        width: '70vw',
        // add mode data
        data: { student: this.student, startDate: arg.dateStr, mode: ADD },
      });
      // what happens after dialog closed
      dialogRef.afterClosed().subscribe((result) => {
        this.attendanceTable = [
          this.attendanceFormat,
          {
            start: result['startDate'],
            end: result['endDate'],
            color: '#FF002E',
            title: 'Vacation',
          },
        ];
        this.mutateVacation(result);
      });
    }, 700);
  }

  // edit vacation when clicking on vacation
  handleEventClick(arg) {
    // get the vacation id from the event
    var vacationId = arg.event._def.publicId;
    // convert vacation id to number so it matches the value in the array
    // get the value from the vacation array
    var vacation = this.vacations.filter(
      (vacation) => vacation['id'] === Number(vacationId)
    )[0];
    // only when a vacation event clicked
    if (vacation != undefined) {
      // show vacation pop up with vacation data
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
          // edit mode data
          data: { student: this.student, vacation: vacation, mode: EDIT },
        });
        // what happens after dialog closed
        dialogRef.afterClosed().subscribe((result) => {
          this.attendanceTable = [
            this.attendanceFormat,
            {
              start: result['startDate'],
              end: result['endDate'],
              color: '#FF002E',
              title: 'Vacation',
            },
          ];
          this.mutateVacation(result);
        });
      }, 700);
    }
    // as closed and filled with information, update the vacation on the backend
    // update the UI calender, can be done be running the resolvers after the api call is done
  }

  // API post and modifying the calender
  mutateVacation(vacation) {
    // add vacation to the attendance table
    if (vacation.mode == ADD) {
      this.VS.addVacation(vacation)
        .then((val) => {
          this.calendarOptions.events = [...this.attendanceTable];
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // TODO: write edit vacation logic
      this.VS.editVacation(vacation)
        .then((val) => {
          // re-run the resolvers
          this.router.navigate([], {
            queryParams: { _nonce: new Date().getTime() },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // edit student
  editStudent() {
    // edit student
    this.router.navigateByUrl('/students/edit-student/' + this.student.id);
  }
  // delete student //* show dialog
  deleteStudent() {
    document.querySelector<HTMLElement>('#dialog')?.click();
  }

  dismiss() {}

  confirmDelete() {
    // this.loader = true;
    this.SS.deleteStudent(this.student.id)
      .then((res) => {
        // this.loader = false;
        this.router.navigateByUrl('/students');
      })
      .catch((err) => {
        console.log('the api failed :', err);
      });
  }
}
