import { Component, OnInit } from '@angular/core';
import { CsvService } from '../auth/services/csv.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(private CSVS: CsvService) {}

  ngOnInit(): void {}

  downloadCsv() {
    this.CSVS.get();
  }
}
