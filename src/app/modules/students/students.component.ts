import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatYYYYDDMM } from 'src/app/constants/globalMethods';
import { STUDENT_HEADER } from 'src/app/constants/headers';
import { TableButtonOptions, TableData } from 'src/app/interfaces/interfaces';
import { Student } from 'src/app/models/Student';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  constructor(
    private SS: StudentsService,
    private AR: ActivatedRoute,
    private router: Router
  ) {}

  // table data
  data: TableData[] = [];
  // table columns
  columns: string[] = STUDENT_HEADER;

  ngOnInit(): void {
    var students: Student[] = [];
    this.AR.data.subscribe((response: any) => {
      students = response.students;
      console.log('the value of students ', students);
      this.data = this.constructTableData(students);
    });
  }

  // make table data
  constructTableData(students: Student[]): TableData[] {
    return students.map((res) => {
      return {
        // the id, to return back for edit or delete events
        id: res.id,
        // the data displayed in each row
        data: [
          res.id,
          res.firstName + ' ' + res.lastName,
          formatYYYYDDMM(new Date(res.createdAt)),
          'First',
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
        isActive: true,
        text: 'Edit',
      },
      // delete button
      delete: {
        isActive: false,
        text: 'Delete',
      },
    };
  }

  addStudent() {
    this.router.navigateByUrl('/students/add-student');
  }

  editStudent(event) {
    console.log(event);
    this.router.navigateByUrl('/students/edit-student/' + event);
  }
}
