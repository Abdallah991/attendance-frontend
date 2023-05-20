import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  [x: string]: any;
  constructor(private AR: ActivatedRoute) {}

  student = null;
  attendance: [] = [];
  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.student = response.student.data['student'];
      // this.attendance = response.attendance.data;
      console.log(this.student);
      // console.log(this.attendance);
    });
  }
}
