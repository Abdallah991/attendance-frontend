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

  platfomrUsersNumber: number = 0;

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      var students = response.candidates;
      this.platfomrUsersNumber = students.length;
    });
  }

  downloadCsv() {
    this.CSVS.get();
  }
}
