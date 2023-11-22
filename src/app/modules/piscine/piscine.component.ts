import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatYYYYDDMMHHMM } from 'src/app/constants/globalMethods';
import { SELECTION_POOL_HEADER } from 'src/app/constants/headers';
import { TableButtonOptions, TableData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-piscine',
  templateUrl: './piscine.component.html',
  styleUrls: ['./piscine.component.scss'],
})
export class PiscineComponent implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    // form group
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  columns = SELECTION_POOL_HEADER;
  // data coming from the API
  applicants: any[] = [];
  // data made for the table
  arrangedApplicants: any[] = [];
  data: TableData[] = [];
  // Stats:
  lastavtivityIn24 = 0;
  lastavtivityIn48 = 0;
  // form
  form: FormGroup;
  // * html constants
  htmlExpression = '';
  break = '<br/>';
  sytleName = '<h5>';
  styleNameEnd = '</h5>';

  // * Comments
  Yanal = '';
  Tech = '';
  Operations = '';
  Marketing = '';
  Assistants = '';

  ngOnInit(): void {
    this.AR.data.subscribe((value) => {
      this.applicants = value.applicants;
      //
      this.arrangeData(this.applicants);
      // sort last activity
      this.sortOnLastActivity();
      this.activeInTheLast24();
      this.data = this.constructTableData(this.arrangedApplicants);
    });
  }

  // make table data
  constructTableData(applicants: any[]): TableData[] {
    return applicants.map((res) => {
      return {
        // the id, to return back for edit or delete events
        id: res['login'],
        // the data displayed in each row
        data: [
          // sequence,
          // res['profileImage'],
          res['login'],
          res['name'],
          res['phone'],
          res['nationality'],
          res['lastProgress'],
          // ! This should be crafted as comments here for each cell
          this.sytleName +
            'YN:' +
            // this.break +
            'Comments dhcjhckjb kwlscnl awsdkjcnb wkcjnwe ' +
            this.styleNameEnd +
            this.break +
            this.sytleName +
            'YN:' +
            // this.break +
            'Comments dhcjhckjb kwlscnl awsdkjcnb wkcjnwe ' +
            this.styleNameEnd,
          // Adding five comments
          // Yanal,Tech, Operation, Marketing, Students
          res['date'],
        ],
        // the action buttons
        profileImage: res['profileImage'],
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
        text: 'Details',
      },
      // delete button
      delete: {
        isActive: true,
        text: 'Comment',
      },
    };
  }

  // arrange data for the table
  async arrangeData(applicants) {
    applicants.forEach((applicant) => {
      var length = applicant['progresses']?.length
        ? applicant['progresses']?.length
        : 0;
      // console.log(res['progresses']?.length ? res['progresses']?.length : 0);
      var lastProgress = 'No Activity';
      var date = '2023-09-03 10:00';
      if (length > 0) {
        lastProgress = applicant['progresses'][length - 1]['path']
          .split('/')
          .slice(-2)
          .join('/');
        date = formatYYYYDDMMHHMM(
          applicant['progresses'][length - 1]['updatedAt']
        );
      }

      // console.log(lastProgress);
      // console.log(date);
      this.arrangedApplicants.push({
        login: applicant.login,
        name: applicant.firstName + ' ' + applicant.lastName,
        phone: applicant.phone ? applicant.phone : applicant.phoneNumber,
        nationality: applicant.nationality,
        lastProgress: lastProgress,
        date: date,
        profileImage: applicant.profileImage,
      });
    });
  }

  sortOnLastActivity() {
    var lastActivityUsers = this.arrangedApplicants.sort((a, b) => {
      if (b['date'] < a['date']) {
        return -1;
      }
      if (b['date'] > a['date']) {
        return 1;
      }
      return 0;
    });
    this.arrangedApplicants = lastActivityUsers;
    // console.log(lastActivityUsers);
  }

  activeInTheLast24() {
    var nowDate = new Date();
    var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    var beforeYesterday = new Date(new Date().getTime() - 48 * 60 * 60 * 1000);

    this.arrangedApplicants.forEach((applicant) => {
      var lastActivityDate = new Date(applicant.date);
      if (lastActivityDate >= yesterday && lastActivityDate <= nowDate) {
        this.lastavtivityIn24++;
      }
      if (lastActivityDate >= beforeYesterday && lastActivityDate <= nowDate) {
        this.lastavtivityIn48++;
      }
    });
  }

  // TODO: Check last activity by date
  // TODO: Sort on date.
  // TODO: search by name or platform id
  // TODO: Details
  // TODO: Frequency done on question, Time spend on it

  navigateToCandidate(candidate) {
    this.router.navigateByUrl('/piscine/view-candidate/' + candidate);
  }
}
