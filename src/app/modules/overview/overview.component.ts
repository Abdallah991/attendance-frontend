import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableButtonOptions, TableData } from 'src/app/interfaces/interfaces';
import { PROGRESS_HEADER } from 'src/app/constants/headers';
import Chart from 'chart.js/auto';

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
      // sort students on transactions attribute
      try {
        if (this.students.length > 0) {
          this.sortOnAudits(false);
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
  // createChart() {
  //   var studentsCharts: any = {};
  //   this.students.forEach((item) => {
  //     // console.log(item['progressAt']);
  //     if (!studentsCharts[item['progressAt']]) {
  //       studentsCharts[item['progressAt']] = 1;
  //     } else {
  //       studentsCharts[item['progressAt']]++;
  //     }
  //   });
  //   // get the x-axis labels dynamically
  //   var labels = [];
  //   for (let label in studentsCharts) {
  //     labels.push(label);
  //   }
  //   var values = [];
  //   for (let value in studentsCharts) {
  //     values.push(studentsCharts[value]);
  //   }
  //   console.log(studentsCharts);
  //   console.log(labels);
  //   console.log(values);
  //   // use frequency counter to get to the bottom of these values
  //   // export the keys to the chart
  //   this.chart = new Chart('canvas', {
  //     type: 'bar',
  //     data: {
  //       // names of projects
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: 'Students',
  //           data: values,
  //           borderWidth: 2,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //         x: {
  //           ticks: {
  //             autoSkip: false,
  //             maxRotation: 90,
  //             minRotation: 90,
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  // createAuditChart() {
  //   // TODO: Audit Chart
  //   var studentsAuditsCharts: any = {
  //     aboveFive: 0,
  //     aboveOne: 0,
  //     zero: 0,
  //   };
  //   this.students.forEach((item) => {
  //     // console.log(item['progressAt']);
  //     if (item['transaction'] > 5) {
  //       studentsAuditsCharts['aboveFive']++;
  //     } else if (item['transaction'] > 1) {
  //       studentsAuditsCharts['aboveOne']++;
  //     } else {
  //       studentsAuditsCharts['zero']++;
  //     }
  //   });
  //   //
  //   this.auditChart = new Chart('auditCanvas', {
  //     type: 'bar',
  //     data: {
  //       // names of projects
  //       labels: ['More Than 5 Audits', 'More than 1 audit', 'No Audits'],
  //       datasets: [
  //         {
  //           label: 'Audits',
  //           data: [
  //             studentsAuditsCharts['aboveFive'],
  //             studentsAuditsCharts['aboveOne'],
  //             studentsAuditsCharts['zero'],
  //           ],
  //           borderWidth: 2,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }

  async navigateToDetails() {
    this.router.navigate(['overview/cohort-detailed']);
  }
}
