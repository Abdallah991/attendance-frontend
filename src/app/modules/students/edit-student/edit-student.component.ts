import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  public title = 'Add Student';
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private SS: StudentsService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

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
}
