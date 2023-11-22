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
import { CsvService } from '../../auth/services/csv.service';

@Component({
  selector: 'app-applicants-status',
  templateUrl: './applicants-status.component.html',
  styleUrls: ['./applicants-status.component.scss'],
})
export class ApplicantsStatusComponent implements OnInit {
  // confirmation dialog
  dialogTitle = 'Are you sure you want to update the applicant status?';
  message = 'This action is permanent';
  button = 'Dismiss';
  button2 = 'Confirm';
  updatedApplicantId = '';

  constructor(
    private AR: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private AS: ApplicantsService,
    private CS: CsvService
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
      : '2023-09-03';
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

    // preset values for the filtering and search
    this.gradeStartPreSet = gradeStart;
    this.gradeEndPreSet = this.gradeEndPreSet;
    this.statusPreSet = status;
    this.sortPreSet = sort;
    // set the values for filtering and search accordingly
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
  registeredToCheckIn1 = 0;
  registeredToCheckIn2 = 0;

  registeredToSp = 0;

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
    // * events counts
    // get the table data
    this.getTableData();
    this.getCheckInCount1();
    this.getCheckInCount2();
    this.getSpCount();
  }

  getTableData() {
    //  enable subscrbtion with router/url change
    this.AR.data.subscribe((response: any) => {
      // console.log(response);
      // reset applicants
      this.applicants = [];
      // passed and failed within a time period
      this.passed = 0;
      this.failed = 0;
      this.totalApplicants = 0;
      // latest applicants
      this.latestApplicants = [];
      // * get the applicants from the resolver call
      this.applicants = response.applicants;

      // console.log(this.applicants);
      // get the keys of the object passed
      var objectKeys = Object.keys(this.applicants);
      // for each object
      // console.log(this.applicants);
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
      this.data = this.constructTableData(this.latestApplicants.reverse());
    });
  }

  // make table data
  constructTableData(applicants: any[]): TableData[] {
    var sequence = 0;
    return applicants.map((res) => {
      sequence++;
      // convert progresses to json // get the last progress //get the last word of that progress
      // console.log(res['progresses']);
      // console.log(res['platformId']);

      var progresses = JSON.parse(res['progresses'])
        .pop()
        ?.path.split('/')
        .pop();
      // console.log(progresses);
      var registration = JSON.parse(res['registrations'])
        .pop()
        ?.registration?.path.split('/')
        .pop();
      var progress = '-';
      if (registration) {
        progress = 'Registered to ' + registration;
      } else if (progresses != undefined) {
        progress = 'At ' + progresses;
      } else {
        progress = '-';
      }
      // console.log(registration);
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
          // res['email'],
          // These elements to be updated
          res['status'],
          // res['updatedBy'] ? res['updatedBy'] : '-',
          progress,
          // progresses ? progresses : '-',
          // registration ? registration : '-',
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
        text: 'Called',
      },
      // delete button
      delete: {
        isActive: false,
        text: 'Not Attending',
      },
    };
  }

  // ? triggering the resolver and reconstructing the table of drop downs or date selection
  status($event) {
    this.form.controls.applicantsStatus.setValue($event);
    this.updateRoute();
  }

  sort($event) {
    this.form.controls.applicantsSorter.setValue($event);
    this.updateRoute();
  }

  endDate($event) {
    this.form.controls.endDate.setValue($event);
    this.updateRoute();
  }

  startDate($event) {
    this.form.controls.startDate.setValue($event);
    this.updateRoute();
  }

  gradeStart($event) {
    this.form.controls.applicantsGradeStart.setValue($event);
    this.updateRoute();
  }

  gradeEnd($event) {
    this.form.controls.applicantsGradeEnd.setValue($event);
    this.updateRoute();
  }

  // update the route depending on applicant value
  updateRoute($updatedApplicant?) {
    this.router.navigate([], {
      queryParams: {
        startDate: formatYYYYDDMM(this.form.controls.startDate.value),
        endDate: formatYYYYDDMM(this.form.controls.endDate.value),
        status: this.form.controls.applicantsStatus.value,
        gradeStart: this.form.controls.applicantsGradeStart.value,
        gradeEnd: this.form.controls.applicantsGradeEnd.value,
        sort: this.form.controls.applicantsSorter.value,
        updatedApplicant: $updatedApplicant,
      },
    });
  }

  // reset filters
  resetFilters() {
    this.form.controls.applicantsGradeEnd.setValue('all');
    this.form.controls.applicantsGradeStart.setValue('all');
    this.form.controls.startDate.setValue('2023-09-03');
    this.form.controls.endDate.setValue(this.tomorrowDate);
    this.form.controls.applicantsSorter.setValue('descending');
    this.form.controls.applicantsStatus.setValue('all');
    this.updateRoute();
  }

  // sync applicants and update the table
  syncApplicantsData() {
    this.loader = true;
    this.AS.syncApplicants(this.tomorrowDate).subscribe((value) => {
      // console.log(value);
      this.loader = false;
      this.resetFilters();
    });
  }

  // * check-ins counts
  // get the number of how many users signed up to the checkin on the platform
  getCheckInCount1() {
    this.AS.checkInCount(76).subscribe((val) => {
      this.registeredToCheckIn1 = val;
    });
  }

  // get the number of how many users signed up to the checkin on the platform
  getCheckInCount2() {
    this.AS.checkInCount(79).subscribe((val) => {
      this.registeredToCheckIn2 = val;
    });
  }

  // * SP  count
  // get the number of how many users signed up to the checkin on the platform
  getSpCount() {
    this.AS.spCount(78).subscribe((val) => {
      this.registeredToSp = val;
    });
  }

  // use to update applicant call
  updateApplicantStatus(platformId, status) {
    this.AS.updateApplicant(platformId, status).subscribe((val) => {
      console.log(val);
      this.updateRoute(platformId);
    });
  }

  // update applicant click implementation
  updateApplicant($event) {
    console.log($event);
    this.updatedApplicantId = $event;
    this.showDialog();
  }

  // * Download CSV
  downloadApplicantsData() {
    // applicants
    var applicants: any[] = [];
    // get only relevant data

    this.applicants.forEach((applicant) => {
      // * get the progress of the applicant
      // ! make this in a function
      var progresses = JSON.parse(applicant['progresses'])
        .pop()
        ?.path.split('/')
        .pop();
      var registration = JSON.parse(applicant['registrations'])
        .pop()
        ?.registration?.path.split('/')
        .pop();
      var progress = '-';
      if (registration) {
        progress = 'Registered to ' + registration;
      } else if (progresses != undefined) {
        progress = 'At ' + progresses;
      } else {
        progress = '-';
      }
      // *
      var data = {
        login: applicant.platformId,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        email: applicant.email,
        phoneNumber: applicant.phone,
        progress: progress,
        score: applicant.score,
      };
      // push to custome object
      applicants.push(data);
    });
    // get the csv file from the service
    this.CS.get(applicants);
  }

  async showDialog() {
    document.querySelector<HTMLElement>('#dialog')?.click();
  }

  dismiss() {}

  confirmDelete($event) {
    console.log($event);
    var comment = $event ? $event : '-';
    this.updateApplicantStatus(this.updatedApplicantId, comment);
  }
}
