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
  // loader of button
  addLoader: boolean = false;
  // confirmation dialog
  dialogTitle =
    this.student?.firstName + ' ' + this.student?.lastName + ' Has been Added!';
  message = 'One Extra Rebooter';
  button = 'Done';
  button2 = 'Add Another';
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
    this.addLoader = true;
    this.studentForm.disable();
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
    try {
      this.SS.addStudent(studentInput).subscribe((student) => {
        console.log('the response value is ', student);
        this.studentForm.enable();
        this.addLoader = false;
        this.studentForm.reset();
        this.student = new Student(student.data.student);
        this.dialogTitle =
          this.student.firstName +
          ' ' +
          this.student?.lastName +
          ' Has been Added!';
        this.showSuccessDialog();
        // TODO:

        // TODO: show success dialog
        // TODO: redirect to students table
      });
    } catch (err) {
      // TODO: show error dialog
      console.log(err);
      this.studentForm.enable();
      this.addLoader = false;
      // TODO: API implementation
      this.showFailDialog();
    }

    // this.CS.
  }
  // cancel button implementation
  // async cancel() {
  //   this.router.navigate(['/students']);
  // }

  async navigateBack() {
    this.router.navigateByUrl('/students');
  }

  async dismiss() {
    // dismiss dialog
    // DO nothing
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
  async showSuccessDialog() {
    // this.dialogTitle = title;
    // this.message = message;
    // this.button = button;

    document.querySelector<HTMLElement>('#dialog')?.click();
  }

  async showFailDialog() {
    // this.dialogTitle = title;
    // this.message = message;
    // this.button = button;
    document.querySelector<HTMLElement>('#dialog')?.click();
  }

  // TODO: Show Fail dailog
}
