import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { formatYYYY, formatYYYYDDMM } from 'src/app/constants/globalMethods';

@Component({
  selector: 'app-audits-and-rankings',
  templateUrl: './audits-and-rankings.component.html',
  styleUrls: ['./audits-and-rankings.component.scss'],
})
export class AuditsAndRankingsComponent implements OnInit {
  // students data
  students: [] = [];
  studentsProgress: [] = [];
  // Charts
  genderChart: any = [];
  qualificationChart: any = [];
  ageChart: any = [];
  nationalityChart: any = [];
  chart: any = [];
  auditChart: any = [];

  constructor(private AR: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.students = response.students.data.students;
      this.studentsProgress = response.studentsProgress;
      Chart.register(...registerables);

      console.log(this.students);

      // sort students on transactions attribute
      try {
        if (this.students.length > 0) {
          //  TODO: make a button to switch between this audit with animation
          this.createChart();
          this.createGenderCharts();
          this.createQualificationChart();
          this.createAgeChart();
          this.createNationalityChart();
          this.createAuditChart();
        }
      } catch (e) {
        console.log(e);
        // handle token not being retrieved
        // ! this is will trigger crappy behavior when the platform token gets expired
        // ! This page doesnt work
        //! window.location.reload();
      }
    });
  }

  createGenderCharts() {
    var maleCount = 0;
    var femmaleCount = 0;
    // frequency counter
    this.students.forEach((student) => {
      // console.log(student['acadamicQualification']);
      if (student['gender'] == 'Male') {
        maleCount++;
      } else if (student['gender'] == 'Female') {
        femmaleCount++;
      }
    });
    // set up gender counts
    this.genderChart = new Chart('genderCanvas', {
      type: 'doughnut',
      data: {
        labels: ['Female', 'Male'],
        datasets: [
          {
            data: [femmaleCount, maleCount],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  createQualificationChart() {
    var qualificationData: any = {};
    // frequency counter
    this.students.forEach((student) => {
      if (!qualificationData[student['acadamicQualification']]) {
        qualificationData[student['acadamicQualification']] = 1;
      } else {
        qualificationData[student['acadamicQualification']]++;
      }
    });
    // get the x-axis labels dynamically
    var labels = [];
    for (let label in qualificationData) {
      if (label == 'placeholder') {
        labels.push('Other');
        continue;
      }
      labels.push(label);
    }
    var values = [];
    for (let value in qualificationData) {
      values.push(qualificationData[value]);
    }
    // set up qualifications counts
    this.genderChart = new Chart('qualificationCanvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Qualifications',
            data: values,
            backgroundColor: [
              // TODO: change colors
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'pink',
              'orange',
              'lime',
              'aqua',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  createAgeChart() {
    var age18To20 = 0;
    var age21To23 = 0;
    var age24To26 = 0;
    var age27To29 = 0;
    var age30To32 = 0;
    var age33To35 = 0;
    var age36To38 = 0;
    var ageAbove38 = 0;
    this.students.forEach((student) => {
      var date = Number(formatYYYYDDMM(student['dob']).split('-')[0]);
      var currentYear = Number(formatYYYY(new Date()));
      var age = currentYear - date;

      if (age >= 18 && age <= 20) {
        age18To20++;
      } else if (age >= 21 && age <= 23) {
        age21To23++;
      } else if (age >= 24 && age <= 26) {
        age24To26++;
      } else if (age >= 27 && age <= 29) {
        age27To29++;
      } else if (age >= 30 && age <= 32) {
        age30To32++;
      } else if (age >= 33 && age <= 35) {
        age33To35++;
      } else if (age >= 36 && age <= 38) {
        age36To38++;
      } else {
        ageAbove38++;
      }
    });

    // set up qualifications counts
    this.ageChart = new Chart('ageCanvas', {
      type: 'bar',
      data: {
        labels: [
          '18 - 20',
          '21 - 23',
          '24 - 26',
          '27 - 29',
          '30 - 32',
          '33 - 35',
          '36 - 38',
          'Above 38',
        ],
        datasets: [
          {
            label: 'Age Distribution',
            data: [
              age18To20,
              age21To23,
              age24To26,
              age27To29,
              age30To32,
              age33To35,
              age36To38,
              ageAbove38,
            ],
            backgroundColor: [
              // TODO: change colors
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'pink',
              'orange',
              'aqua',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  createNationalityChart() {
    var bahrainiCount = 0;
    var noneBahrainiCount = 0;

    // frequency counter
    this.students.forEach((student) => {
      if (student['nationality'] == 'Bahrain') {
        bahrainiCount++;
      } else {
        noneBahrainiCount++;
      }
    });
    // get the x-axis labels dynamically
    var labels = ['Bahraini', 'Other'];

    // set up gender counts
    this.nationalityChart = new Chart('nationalityCanvas', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: [bahrainiCount, noneBahrainiCount],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // TODO: set up different chart methods here
  createChart() {
    var studentsCharts: any = {};
    this.studentsProgress.forEach((item) => {
      // console.log(item['progressAt']);
      if (!studentsCharts[item['progressAt']]) {
        studentsCharts[item['progressAt']] = 1;
      } else {
        studentsCharts[item['progressAt']]++;
      }
    });
    // get the x-axis labels dynamically
    var labels = [];
    for (let label in studentsCharts) {
      labels.push(label);
    }
    var values = [];
    for (let value in studentsCharts) {
      values.push(studentsCharts[value]);
    }

    // use frequency counter to get to the bottom of these values
    // export the keys to the chart
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        // names of projects
        labels: labels,
        datasets: [
          {
            label: 'Students',
            data: values,
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90,
            },
          },
        },
      },
    });
  }

  createAuditChart() {
    // TODO: Audit Chart
    var studentsAuditsCharts: any = {
      aboveFive: 0,
      aboveOne: 0,
      zero: 0,
    };
    this.studentsProgress.forEach((item) => {
      if (item['transaction'] > 5) {
        studentsAuditsCharts['aboveFive']++;
      } else if (item['transaction'] > 1) {
        studentsAuditsCharts['aboveOne']++;
      } else {
        studentsAuditsCharts['zero']++;
      }
    });
    //
    this.auditChart = new Chart('auditCanvas', {
      type: 'bar',
      data: {
        // names of projects
        labels: ['More Than 5 Audits', 'More than 1 audit', 'No Audits'],
        datasets: [
          {
            label: 'Audits',
            data: [
              studentsAuditsCharts['aboveFive'],
              studentsAuditsCharts['aboveOne'],
              studentsAuditsCharts['zero'],
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

  async navigateToDetails() {
    this.router.navigate(['overview/cohort-detailed']);
  }
}