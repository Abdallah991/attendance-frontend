import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.scss'],
})
export class ViewCandidateComponent implements OnInit {
  [x: string]: any;
  constructor(private AR: ActivatedRoute) {}

  student = null;
  attendance: [] = [];
  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.student = response.candidate.data['student'];
      // this.attendance = response.attendance.data;
      console.log(this.student);
      // console.log(this.attendance);
    });
  }
}
