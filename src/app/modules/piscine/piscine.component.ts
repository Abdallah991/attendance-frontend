import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { formatYYYYDDMMHHMM } from 'src/app/constants/globalMethods';
import { SELECTION_POOL_HEADER } from 'src/app/constants/headers';
import { TableButtonOptions, TableData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-piscine',
  templateUrl: './piscine.component.html',
  styleUrls: ['./piscine.component.scss'],
})
export class PiscineComponent implements OnInit {
  constructor(private AR: ActivatedRoute, private fb: FormBuilder) {
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

  ngOnInit(): void {
    this.AR.data.subscribe((value) => {
      this.applicants = value.applicants;
      console.log(this.applicants);
      // formate the data for the table
      this.arrangeData(this.applicants);

      console.log(this.arrangedApplicants);
      // sort the table of the last activity
      this.sortOnLastActivity();
      this.activeInTheLast24();
      this.data = this.constructTableData(this.arrangedApplicants);
    });
  }

  // make table data
  constructTableData(applicants: any[]): TableData[] {
    var sequence = 0;
    return applicants.map((res) => {
      sequence++;

      return {
        // the id, to return back for edit or delete events
        id: res['login'],
        // the data displayed in each row
        data: [
          sequence,
          res['login'],
          res['name'],
          res['phone'],
          res['nationality'],
          res['lastProgress'],
          res['date'],
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
        text: 'Details',
      },
      // delete button
      delete: {
        isActive: false,
        text: 'Not Attending',
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
}
