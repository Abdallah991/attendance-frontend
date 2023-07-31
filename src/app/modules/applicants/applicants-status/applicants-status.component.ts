import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  APPLICANTS_SORT,
  APPLICANTS_STATUS,
  GRADES_END,
  GRADES_START,
} from 'src/app/constants/constants';
import { formatYYYYDDMM } from 'src/app/constants/globalMethods';
import { APPLICANTS_STATUS_HEADER } from 'src/app/constants/headers';
import {
  SelectData,
  TableButtonOptions,
  TableData,
} from 'src/app/interfaces/interfaces';
import { ApplicantsService } from '../services/applicants.service';

@Component({
  selector: 'app-applicants-status',
  templateUrl: './applicants-status.component.html',
  styleUrls: ['./applicants-status.component.scss'],
})
export class ApplicantsStatusComponent implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private AS: ApplicantsService
  ) {
    // get a snap shot of the router data
    var snapshot = this.route.snapshot;
    // create a default date that is tomorrow
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 1);
    // format it to have the format graphQL understands
    this.tomorrowDate = formatYYYYDDMM(todayDate);
    // ? safe fail method by setting defaulta in the case if there is no data
    // if there is a start date in the url, its it, if not its may 14th
    var startDate = snapshot.queryParamMap.get('startDate')
      ? snapshot.queryParamMap.get('startDate')
      : '2023-05-14';
    // if there is a end date in the url, its it, if not its tomorrow
    var endDate = snapshot.queryParamMap.get('endDate')
      ? snapshot.queryParamMap.get('endDate')
      : this.tomorrowDate;

    var sort = snapshot.queryParamMap.get('sort')
      ? snapshot.queryParamMap.get('sort')
      : 'descending';
    var status = snapshot.queryParamMap.get('status')
      ? snapshot.queryParamMap.get('status')
      : 'all';

    var gradeStart = snapshot.queryParamMap.get('gradeStart')
      ? snapshot.queryParamMap.get('gradeStart')
      : 'all';
    var gradeEnd = snapshot.queryParamMap.get('gradeEnd')
      ? snapshot.queryParamMap.get('gradeEnd')
      : 'all';
    // form group
    this.form = this.fb.group({
      startDate: [startDate, Validators.required],
      endDate: [endDate, Validators.required],
      applicantsStatus: [status, Validators.required],
      applicantsGradeStart: [gradeStart, Validators.required],
      applicantsGradeEnd: [gradeEnd, Validators.required],
      applicantsSorter: [sort, Validators.required],
    });

    this.gradeStartPreSet = gradeStart;
    this.gradeEndPreSet = this.gradeEndPreSet;
    this.statusPreSet = status;
    this.sortPreSet = sort;

    this.form.controls.applicantsStatus.setValue(status);
    this.form.controls.applicantsGradeStart.setValue(gradeStart);
    this.form.controls.applicantsGradeEnd.setValue(gradeEnd);
    this.form.controls.applicantsSorter.setValue(sort);

  }

  // applicants between two dates
  applicants: any[] = [];
  // latest applicants
  latestApplicants: any[] = [];
  // passed and failed metrics
  passed = 0;
  failed = 0;
  totalApplicants = 0;
  columns = APPLICANTS_STATUS_HEADER;
  // data table
  data: TableData[] = [];
  // drop down select data
  applicationStatus: SelectData[] = APPLICANTS_STATUS;
  applicantsGradeStart: SelectData[] = GRADES_START;
  applicantsGradeEnd: SelectData[] = GRADES_END;

  applicantsSorter: SelectData[] = APPLICANTS_SORT;
  // ? pagination loader
  loader: boolean = false;
  // date selection form
  form: FormGroup;

  // preset values
  sortPreSet = 'descending';
  statusPreSet = 'all';
  gradeStartPreSet: any = 'all';
  gradeEndPreSet: any = 'all';

  // tomorrow date
  tomorrowDate = formatYYYYDDMM(new Date());


  ngOnInit(): void {
    // get the table data
    this.getTableData();
  }

  getTableData() {
    //  enable subscrbtion with router/url change
    this.AR.data.subscribe((response: any) => {
      // reset applicants
      this.applicants = [];
      // passed and failed within a time period
      this.passed = 0;
      this.failed = 0;
      this.totalApplicants = 0;
      // latest applicants
      this.latestApplicants = [];
      // get the applicants from the resolver call
      this.applicants = response.applicants;
      // get the keys of the object passed
      var objectKeys = Object.keys(this.applicants);
      // for each object
      objectKeys.forEach((key) => {
        // add to the latest applicant array
        this.latestApplicants.push(this.applicants[key]);
        // condition of passing
        if (this.applicants[key]['score'] >= 25) {
          this.passed++;
        } else if (
          this.applicants[key]['score'] < 25 &&
          this.applicants[key]['score'] != null
        ) {
          // otherwise failed
          this.failed++;
        }
      });

      // construct table
      this.totalApplicants = this.passed + this.failed;
      console.log(this.passed);
      console.log(this.failed);
      console.log(this.totalApplicants);
      this.data = this.constructTableData(this.latestApplicants.reverse());
    });
  }

  // make table data
  constructTableData(applicants: any[]): TableData[] {
    var sequence = 0;
    return applicants.map((res) => {
      sequence++;
      // convert progresses to json // get the last progress //get the last word of that progress
      var progresses = JSON.parse(res['progresses']).pop()?.path.split('/').pop();
      return {
        // the id, to return back for edit or delete events
        id: res['platformId'],
        // the data displayed in each row
        data: [
          sequence,
          res['firstName'] + ' ' + res['lastName'],
          res['platformId'],
          res['score'] ? res['score'].toFixed(2) : '0',
          res['lastGameDate'] ? formatYYYYDDMM(res['lastGameDate']) : '0',
          res['phone'],
          res['email'],
          // These elements to be updated
          res['status'],
          res['updatedBy'] ? res['updatedBy'] : '-',
          progresses ? progresses : '-',
        ],
        // the action buttons
        actionButtons: this.constructTableButton(),
      };
    });
  }
  // make row buttons
  constructTableButton(): TableButtonOptions {
    return {
      // edit button
      edit: {
        isActive: true,
        text: 'Attending',
      },
      // delete button
      delete: {
        isActive: false,
        text: 'Not Attending',
      },
    };
  }

  // implementation to update the values
  viewApplicant($event) {}
  // ? triggering the resolver and reconstructing the table
  status($event) {
    this.form.controls.applicantsStatus.setValue($event)
    this.updateRoute();
    
  }

  sort($event) {
    this.form.controls.applicantsSorter.setValue($event)
    this.updateRoute();
  }

  endDate($event) {
    this.form.controls.endDate.setValue($event)
    this.updateRoute();
    
  }

  startDate($event) {
    this.form.controls.startDate.setValue($event)
    this.updateRoute();

  }

  gradeStart($event) {
    this.form.controls.applicantsGradeStart.setValue($event)
    this.updateRoute();

    
  }

  gradeEnd($event) {
    this.form.controls.applicantsGradeEnd.setValue($event)
    this.updateRoute();
  }

  updateRoute() {
    this.router.navigate([], {
      queryParams: {
        startDate: formatYYYYDDMM(this.form.controls.startDate.value),
        endDate: formatYYYYDDMM(this.form.controls.endDate.value),
        status: this.form.controls.applicantsStatus.value,
        gradeStart: this.form.controls.applicantsGradeStart.value,
        gradeEnd: this.form.controls.applicantsGradeEnd.value,
        sort: this.form.controls.applicantsSorter.value,
      },
    });
  }


  resetFilters() {
    this.form.controls.applicantsGradeEnd.setValue('all')
    this.form.controls.applicantsGradeStart.setValue('all')
    this.form.controls.startDate.setValue('2023-05-14')
    this.form.controls.endDate.setValue(this.tomorrowDate)
    this.form.controls.applicantsSorter.setValue('descending');
    this.form.controls.applicantsStatus.setValue('all');
    this.updateRoute();

  }

  syncApplicantsData() {
    this.loader = true;
    this.AS.syncApplicants(this.tomorrowDate).subscribe(value => {
      console.log(value)
      this.loader = false;
    })
  }

  // ! very important
  // TODO: add attending/ not attending/ No answer/ Maybe buttons
  // TODO: Make it colorful
  // TODO: Have a count of all the people that have these statuses
  // TODO: Have them with color codes

  // TODO: Have a mechanisim to update the status of the calls
  // ! loading time is too long
  // 1- a table of some sort that has the applicant's data
  // 2- a crone function that runs on click to synchronize all the data
}
