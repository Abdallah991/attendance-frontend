import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableButtonOptions, TableData } from 'src/app/interfaces/interfaces';
import { PROGRESS_HEADER } from 'src/app/constants/headers';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  // ! create a CSV service
  constructor(private AR: ActivatedRoute, private router: Router) {}

  qualificationChart: any = [];
  ageChart: any = [];
  nationalityChart: any = [];
  // students
  students: [] = [];
  // table data
  data: TableData[] = [];
  // table columns
  columns: string[] = PROGRESS_HEADER;
  // search loader
  showResults: boolean = false;
  // pagination loader
  loader: boolean = false;
  // login sorter controller
  loginAscendingController: boolean = true;
  // level ascending order
  levelAscendingController: boolean = true;
  // platform id aascending order
  platformAscendingController: boolean = true;

  ngOnInit(): void {
    this.getTableData();
  }

  // TODO: make sure that this function works properly and loads the data
  getTableData() {
    this.AR.data.subscribe((response: any) => {
      this.students = response.students;
      // console.log(this.students);
      // sort students on transactions attribute
      try {
        if (this.students.length > 0) {
          this.sortOnLevel(false);
          //  TODO: make a button to switch between this audit with animation
        }
      } catch (e) {
        console.log(e);
        // handle token not being retrieved
        // ! this is will trigger crappy behavior when the platform token gets expired
        // window.location.reload();
      }
    });
  }

  // make table data
  constructTableData(students: any[]): TableData[] {
    var sequence = 0;
    return students.map((res) => {
      sequence++;
      return {
        // the id, to return back for edit or delete events
        id: res['id'],
        // the data displayed in each row
        data: [
          sequence,
          res['login'],
          res['firstName'] + ' ' + res['lastName'],
          res['progressAt'],
          res['up'] ? res['up'] : '0',
          res['down'] ? res['down'] : '0',
          res['auditDate'],
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

  // sort on level
  sortOnLevel(controller) {
    var sortedStudents = [];
    var students = this.students;
    if (controller) {
      sortedStudents = students.sort(({ level: a }, { level: b }) => a - b);
    } else {
      sortedStudents = students.sort(({ level: a }, { level: b }) => b - a);
    }
    this.data = this.constructTableData(sortedStudents);
  }

  // sort on login
  sortOnLogin(controller) {
    var sortedStudents = [];
    var students = this.students;
    if (controller) {
      sortedStudents = students.sort((a, b) => {
        if (a['login'] > b['login']) {
          return -1;
        }
        if (a['login'] < b['login']) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedStudents = students.sort((a, b) => {
        if (a['login'] < b['login']) {
          return -1;
        }
        if (a['login'] > b['login']) {
          return 1;
        }
        return 0;
      });
    }
    this.data = this.constructTableData(sortedStudents);
  }

  // sort on audits
  sortOnAudits(controller) {
    var sortedStudents = [];
    var students = this.students;
    if (controller) {
      sortedStudents = students.sort(
        ({ transaction: a }, { transaction: b }) => a - b
      );
    } else {
      sortedStudents = students.sort(
        ({ transaction: a }, { transaction: b }) => b - a
      );
    }
    this.data = this.constructTableData(sortedStudents);
  }

  // sort on date as well
}
