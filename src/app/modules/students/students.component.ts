import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  constructor(private SS: StudentsService, private AR: ActivatedRoute) {}

  ngOnInit(): void {
    var students: Student[] = [];
    this.AR.data.subscribe((response: any) => {
      students = response.students;
      console.log('the value of students ', students);
    });
  }
}
