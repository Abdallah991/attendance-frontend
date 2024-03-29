import { Component, OnInit } from '@angular/core';
import { formatYYYY, formatYYYYDDMM } from 'src/app/constants/globalMethods';
// Calender imports
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss'],
})
export class BirthdaysComponent implements OnInit {
  constructor(private AR: ActivatedRoute) {}

  // shading the events
  // TODO: Add different shades
  // TODO: add the year in the backend of this year
  // TODO: sort the dates
  // TODO: you can then do counters and shades
  previousDate = '';
  counter = 0;
  firstShade = '#06005E';
  secondShade = '#06008E';
  thirdShade = '#0600AE';
  fourthShade = '#0600DE';

  // Caleder configuration
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    // add interactions plugin to allow click on date
    plugins: [dayGridPlugin, interactionPlugin],
    // * handle click events
    // handle date click
    // dateClick: this.handleDateClick.bind(this),
    // handle event click
    // eventClick: this.handleEventClick.bind(this),
    buttonText: {
      today: 'Today',
    },
  };

  // formatting attendance to Full calendar
  attendanceTable: any[] = [];

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      // TODO: replace the first part with the date
      // console.log(response.birthdays.data.birthdays);

      response.birthdays.data.birthdays.forEach((birthday) => {
        // split the date
        var date = formatYYYYDDMM(birthday.date).split('-');
        // replace the year with this year date
        date[0] = formatYYYY(new Date());
        // join the date
        var birthdayDate = date.join('-');
        // push into the calender
        this.attendanceTable.push({
          date: birthdayDate,
          title: birthday.name,
          color: this.firstShade,
        });
        // one time
        this.calendarOptions.events = this.attendanceTable;
      });
    });
  }
}
