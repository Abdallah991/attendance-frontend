import { Component, OnInit } from '@angular/core';
import { CsvService } from '../auth/services/csv.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(private CSVS: CsvService, private AR: ActivatedRoute) {}

  platfomrUsers: any = 0;
  signedUsers7days: any = 0;
  signedUsers1days: any = 0;

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.platfomrUsers = response.candidates.length;
      this.signedUsers7days = response.signedUsers.length;
      this.signedUsers1days = response.latestSignedUsers.length;
    });
  }

  downloadCsv() {
    this.CSVS.get();
  }
}
