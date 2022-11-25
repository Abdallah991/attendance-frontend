import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mapTo } from 'rxjs/operators';
import { GENDERS, SUPPORTED_BY_TAMKEEN } from 'src/app/constants/constants';
import { SelectData } from 'src/app/interfaces/interfaces';
import { Cohort } from 'src/app/models/Cohort';
import { Student } from 'src/app/models/Student';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  // Title to toggle between add and edit
  public title = 'Add Student';
  studentForm: FormGroup;
  // single drop down options
  genders = GENDERS;
  cohortsData: SelectData[] = [];
  supportedByTamkeenData: SelectData[] = SUPPORTED_BY_TAMKEEN;
  // type of form
  type: 'view' | 'create';
  // studen
  student: Student = null;

  constructor(
    private fb: FormBuilder,
    private SS: StudentsService,
    private router: Router,
    private AR: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // form
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cohort: ['', Validators.required],
      supportedByTamkeen: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      studentLogs: [''],
    });
  }

  ngOnInit(): void {}

  // form Validation return value
  isValid = (controlName) =>
    this.studentForm.controls[controlName].touched &&
    this.studentForm.controls[controlName].errors
      ? true
      : false;

  cancel() {
    this.router.navigate(['/students']);
  }

  // TODO:
  // 1- drop down.
  // 2- add student functionality
  // 3- success dialog.
  // 4- failed dialog

  addStudent() {
    // TODO: show dialogu to confirm
    // TODO: add the student after dialog confirmed
    // TODO: disable buttons while doing that.
    // TODO: route back to students
  }

  // get the value of single select
  genderSelected(event) {}
  cohortSelected(event) {}
  supportedByTamkeen(event) {}

  // fetch data from router

  async fetchDataFromRouter() {
    // cohorts
    var cohorts: Cohort[] = [];
    this.AR.data.subscribe((response: any) => {
      // get the data from the route
      cohorts = response.cohorts;
      // type of form from router
      this.type = response.type;
      // model the data using map
      this.cohortsData = cohorts.map((cohort: Cohort) => {
        return {
          id: cohort.id,
          text: cohort.name,
        };
      });
      console.log(this.cohortsData);

      if (this.type == 'view') {
        // get the food data
        this.student = response.student;
        // set the food info
        this.setStudentInfo();
      }
    });
  }

  // set student info to feilds
  async setStudentInfo() {}
}
