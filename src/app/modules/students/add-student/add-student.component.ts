import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/Student';
import { StudentsService } from '../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectData } from 'src/app/interfaces/interfaces';
import { Cohort } from 'src/app/models/Cohort';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  // Title to toggle between add and edit
  title = 'Add Student';
  studentForm: UntypedFormGroup;
  // single drop down options
  cohortsSelectedData: SelectData[] = [];
  cohorts: Cohort[] = [];
  // student
  student: Student = null;
  // button loader
  loader = false;
  // confirmation dialog
  dialogTitle = '';
  message = '';
  button = '';
  // preset values
  cohortPreSetValue = 1;

  constructor(
    private fb: FormBuilder,
    private SS: StudentsService,
    private router: Router,
    private AR: ActivatedRoute
  ) {
    // form
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      platformId: ['', Validators.required],
      studentId: ['', Validators.required],
      acadamicSpecialization: ['', Validators.required],
      cohortId: [1, Validators.required],
    });

    // get cohort data from resolver
    this.AR.data.subscribe((data) => {
      this.cohorts = data.cohorts.data.cohorts;
      // map cohort object to drop down list
      this.cohortsSelectedData = this.cohorts.map((cohort) => {
        return {
          id: cohort.id,
          text: cohort.name,
        };
      });
    });
  }

  ngOnInit(): void {}

  // add user to the system implementation
  async addStudent() {
    // TODO: Check if the passwords match then allow the users registration
    var studentInput = {
      lastName: this.studentForm.controls.lastName.value,
      id: this.studentForm.controls.studentId.value,
      platformId: this.studentForm.controls.platformId.value,
      firstName: this.studentForm.controls.firstName.value,
      acadamicSpecialization:
        this.studentForm.controls.acadamicSpecialization.value,
      cohortId: this.studentForm.controls.cohortId.value,
    };

    console.log('the value of the form is ', studentInput);

    // this.CS.
  }
  // cancel button implementation
  async cancel() {
    this.router.navigate(['/students']);
  }

  async navigateBack() {
    this.router.navigateByUrl('/students');
  }

  // set the gender value to the form when selected
  cohortSelected(event: number) {
    console.log(event);
    this.studentForm.controls.cohortId.setValue(event);
  }

  // form Validation return value
  isValid = (controlName) =>
    this.studentForm.controls[controlName].touched &&
    this.studentForm.controls[controlName].errors
      ? true
      : false;

  // show success dialog
  async showSuccessDialog(title, message, button) {
    this.dialogTitle = title;
    this.message = message;
    this.button = button;
    document.querySelector<HTMLElement>('#dialog')?.click();
  }

  // TODO: Show Fail dailog
}