import { Component, OnInit } from '@angular/core';
import { CsvService } from '../auth/services/csv.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SelectData,
  TableButtonOptions,
  TableData,
} from 'src/app/interfaces/interfaces';
import { PROGRESS_HEADER } from 'src/app/constants/headers';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  // ! create a CSV service
  constructor(
    private CSVS: CsvService,
    private AR: ActivatedRoute,
    private router: Router
  ) {}

  // students
  students: [] = [];
  // table data
  data: TableData[] = [];
  // table columns
  columns: string[] = PROGRESS_HEADER;
  //  search form
  searchForm: FormGroup;
  searchValues: SelectData[] = [];
  // search loader
  searchLoader: boolean = false;
  showResults: boolean = false;
  // pagination loader
  loader: boolean = false;

  ngOnInit(): void {
    this.getTableData();
  }

  // TODO: make sure that this function works properly and loads the data
  getTableData() {
    this.AR.data.subscribe((response: any) => {
      this.students = response.students;
      // sort students on transactions attribute
      if (this.students.length > 0) {
        var sortedStudents = this.students.sort(
          ({ level: a }, { level: b }) => b - a
        );
        this.students = sortedStudents;
        this.data = this.constructTableData(this.students);
      }
    });
  }

  // make table data
  constructTableData(students: any[]): TableData[] {
    return students.map((res) => {
      return {
        // the id, to return back for edit or delete events
        id: res['id'],
        // the data displayed in each row
        data: [
          res['login'],
          res['firstName'] + ' ' + res['lastName'],
          res['progressAt'],
          res['up'] ? res['up'] : '0',
          res['down'] ? res['down'] : '0',
          res['level'] ? res['level'] : '0',
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

  viewCandidate(id) {
    this.router.navigateByUrl('/students/view-student/' + id);
  }

  downloadCsv() {
    this.CSVS.get();
  }
}
