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
import Chart from 'chart.js/auto';

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

  // charts
  chart: any = [];
  // ! find a way to hide and show these charts
  showCharts: boolean = true;
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

      // sort students on transactions attribute
      try {
        if (this.students.length > 0) {
          this.sortOnAudits(false);
          this.createChart();
        }
      } catch (e) {
        console.log(e);
        // handle token not being retrieved
        // ! this is will trigger crappy behavior when the platform token gets expired
        window.location.reload();
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

  // TODO: set up different chart methods here
  createChart() {
    var studentsCharts: any = {};
    this.students.forEach((item) => {
      // console.log(item['progressAt']);
      if (!studentsCharts[item['progressAt']]) {
        studentsCharts[item['progressAt']] = 1;
      } else {
        studentsCharts[item['progressAt']]++;
      }
    });
    // use frequency counter to get to the bottom of these values
    // export the keys to the chart
    // TODO: Try to set the labels as the keys witha loop so you can have it automized
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        // names of projects
        labels: [
          'web-export-file',
          'web-dockerize',
          'web-stylize',
          'web',
          'justify',
          'fs',
          'output',
          'color',
          'art',
          'reloaded',
          "Didn't submit",
        ],
        datasets: [
          {
            label: 'Students Project Progress',
            data: [
              studentsCharts['ascii-art-web-export-file'],
              studentsCharts['ascii-art-web-dockerize'],
              studentsCharts['ascii-art-web-stylize'],
              studentsCharts['ascii-art-web'],
              studentsCharts['ascii-art-justify'],
              studentsCharts['ascii-art-fs'],
              studentsCharts['ascii-art-output'],
              studentsCharts['ascii-art-color'],
              studentsCharts['ascii-art'],
              studentsCharts['go-reloaded'],
              studentsCharts['-'],
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
