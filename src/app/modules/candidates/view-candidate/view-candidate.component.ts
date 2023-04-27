import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatYYYYDDMMHHMM } from 'src/app/constants/globalMethods';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.scss'],
})
export class ViewCandidateComponent implements OnInit {
  [x: string]: any;
  constructor(private AR: ActivatedRoute) {}

  candidate = null;
  attendance: [] = [];
  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.candidate = response.candidate.data[0];
      this.attendance = response.attendance.data;
      console.log(this.candidate);
      console.log(this.attendance);
    });
  }

  formateDate = (value) => {
    var date = formatYYYYDDMMHHMM(value);
    var array = date.split(' ');
    return {
      date: array[0],
      time: array[1],
    };
  };
}
