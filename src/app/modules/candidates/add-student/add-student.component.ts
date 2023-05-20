import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/Student';
import { CandidatesService } from '../services/candidates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectData } from 'src/app/interfaces/interfaces';

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
  cohorts: SelectData[] = [];
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
    private CS: CandidatesService,
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
      cohortId: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // add user to the system implementation
  async addStudent() {
    // TODO: Check if the passwords match then allow the users registration
    var studentInput = {
      firstName: this.studentForm.controls.firstName.value,
      lastName: this.studentForm.controls.lastName.value,
      joinDate: this.studentForm.controls.joinDate.value,
      password: this.studentForm.controls.password.value,
      email: this.studentForm.controls.email.value,
      dob: this.studentForm.controls.dob.value,
      phone: this.studentForm.controls.phone.value,
      gender: this.studentForm.controls.gender.value,
      position: this.studentForm.controls.position.value,
    };
  }
  // cancel button implementation
  async cancel() {
    this.router.navigate(['/candidates']);
  }

  async navigateBack() {
    this.router.navigateByUrl('/candidates');
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
