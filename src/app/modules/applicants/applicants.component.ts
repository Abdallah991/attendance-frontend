import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatYYYYDDMM, formatYYYYMM } from 'src/app/constants/globalMethods';
import { APPLICANTS_HEADER } from 'src/app/constants/headers';
import { TableButtonOptions, TableData } from 'src/app/interfaces/interfaces';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss'],
})
export class ApplicantsComponent implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // set the date to defaults
    var todayDate = new Date();
    // add a day
    todayDate.setDate(todayDate.getDate() + 1);
    // format it
    var tomorrowDate = formatYYYYDDMM(todayDate);
    // TODO: set the date in the form
    this.form = this.fb.group({
      startDate: ['2023-11-19', Validators.required],
      endDate: [tomorrowDate, Validators.required],
    });
  }

  // applicants between two dates
  applicants: [] = [];
  // passed and failed metrics
  passed = 0;
  failed = 0;
  columns = APPLICANTS_HEADER;
  // data table
  data: TableData[] = [];
  // ? pagination loader
  loader: boolean = false;
  // date selection form
  form: FormGroup;
  // chart js
  chart: any = [];

  // TODO: in this component we should have
  // 2- ability to update the live data by running the resolvers such as calling them
  // 3- ability to update call status and if they COMING or MOT or if they DIDN'T ANSWER
  // 5- Ability to export their data as a csv.
  // 6- Show graphs of registered users, of applicants, and of passed and failed within a certain time period.

  // TODO: Create an overview view for this
  // 1- Add a day forward in the resolver
  // 2-
  ngOnInit(): void {
    this.getTableData();
    console.log('this get triggered again');
  }

  // make table data
  constructTableData(applicants: any[]): TableData[] {
    var sequence = 0;
    return applicants.map((res) => {
      sequence++;
      return {
        // the id, to return back for edit or delete events
        id: res['platformId'],
        // the data displayed in each row
        data: [
          sequence,
          res['firstName'] + ' ' + res['lastName'],
          res['platformId'],
          res['score'] ? res['score'] : '0',
          res['lastGameDate'],
          res['phone'],
          res['email'],
        ],
        // the action buttons
        actionButtons: this.constructTableButton(),
      };
    });
  }

  getTableData() {
    this.AR.data.subscribe((response: any) => {
      this.applicants = [];
      this.passed = 0;
      this.failed = 0;
      var latestApplicants: any[] = [];
      var passedApplicantsFrequency: any[] = [];
      var failedApplicantsFrequency: any[] = [];

      this.applicants = response.applicants;
      console.log(response);
      var objectKeys = Object.keys(this.applicants);
      //
      //? Do I need all of this data to see the monthly applicants ?
      //
      objectKeys.forEach((key) => {
        latestApplicants.push(this.applicants[key]);
        if (this.applicants[key]['score'] >= 25) {
          this.passed++;
          if (
            !passedApplicantsFrequency[
              formatYYYYMM(this.applicants[key]['lastGameDate'])
            ]
          ) {
            passedApplicantsFrequency[
              formatYYYYMM(this.applicants[key]['lastGameDate'])
            ] = 1;
          } else {
            passedApplicantsFrequency[
              formatYYYYMM(this.applicants[key]['lastGameDate'])
            ]++;
          }
        } else {
          this.failed++;
          if (
            !failedApplicantsFrequency[
              formatYYYYMM(this.applicants[key]['lastGameDate'])
            ]
          ) {
            failedApplicantsFrequency[
              formatYYYYMM(this.applicants[key]['lastGameDate'])
            ] = 1;
          } else {
            failedApplicantsFrequency[
              formatYYYYMM(this.applicants[key]['lastGameDate'])
            ]++;
          }
        }
      });

      console.log(passedApplicantsFrequency);
      console.log(failedApplicantsFrequency);
      this.data = this.constructTableData(
        latestApplicants.reverse().slice(0, 8)
      );
      // TODO: Find a way to update the chart element
      // ! creating a new one is causing a problem on update on this subscribtion
      this.createChart(passedApplicantsFrequency);
    });
  }

  // make row buttons
  constructTableButton(): TableButtonOptions {
    return {
      // edit button
      edit: {
        isActive: false,
        text: 'View',
      },
      // delete button
      delete: {
        isActive: false,
        text: 'Delete',
      },
    };
  }

  viewApplicant($event) {}
  startDate($event) {}
  // TODO:
  endDate($event) {
    this.router.navigate([], {
      queryParams: {
        startDate: formatYYYYDDMM(this.form.controls.startDate.value),
        endDate: formatYYYYDDMM(this.form.controls.endDate.value),
      },
    });
  }

  createChart(passedApplicants) {
    // get the x-axis labels dynamically
    var labels = [];
    for (let label in passedApplicants) {
      labels.push(label);
    }
    var values = [];
    for (let value in passedApplicants) {
      values.push(passedApplicants[value]);
    }
    console.log(passedApplicants);
    console.log(labels);
    console.log(values);
    // use frequency counter to get to the bottom of these values
    // export the keys to the chart
    // TODO: There should a certain mechanisim to update the charts
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        // names of projects
        labels: labels,
        datasets: [
          {
            label: 'Applicants',
            data: values,
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90,
            },
          },
        },
      },
    });
    this.chart.update();
  }

  async navigateToStatus() {
    console.log(this.route);
    this.router.navigate(['status'], {
      relativeTo: this.route,

      queryParams: {
        startDate: formatYYYYDDMM(this.form.controls.startDate.value),
        endDate: formatYYYYDDMM(this.form.controls.endDate.value),
      },
    });
  }
}
