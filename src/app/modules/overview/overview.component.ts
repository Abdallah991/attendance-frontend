import { Component, OnInit } from '@angular/core';
import { CsvService } from '../auth/services/csv.service';
import { ActivatedRoute } from '@angular/router';
import {
  getCurrentDate,
  getDate7Days,
  getDateTomorrow,
} from 'src/app/constants/globalMethods';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(private CSVS: CsvService, private AR: ActivatedRoute) {}

  platfomrUsersNumber: number = 0;
  signedUsers7days: number = 0;
  signedUsers1days: number = 0;

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      var students = response.candidates;
      var signedUsers = response.signedUsers;
      this.platfomrUsersNumber = students.length;
      this.signedUsers7days = signedUsers.length;
      this.signedUsers1days = response.latestSignedUsers.length;
    });
  }

  downloadCsv() {
    this.CSVS.get();
  }
}
