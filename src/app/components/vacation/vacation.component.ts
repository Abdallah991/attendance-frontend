import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ADD, EDIT } from 'src/app/constants/constants';
import { formatYYYYDDMM, getUser } from 'src/app/constants/globalMethods';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss'],
})
export class VacationComponent implements OnInit {
  // dialog form group
  form: FormGroup;
  // titles
  startDateTitle: string = 'Start Date';
  endDateTitle: string = 'End Date';
  // student info
  student: any = null;
  // user info
  user: any = null;
  // header title
  addOrEdit = 'Add';

  constructor(
    // dialof references to control dialog actions
    public dialogRef: MatDialogRef<VacationComponent>,
    // data of the dialog
    @Inject(MAT_DIALOG_DATA) public data: any,
    // form builder to control form actions
    private fb: FormBuilder
  ) {
    // get students data
    this.student = this.data.student;
    // get user data
    this.user = getUser();
    // build form group
    // need a controller that the pop can know its add or edit
    if (this.data.mode == ADD) {
      // add mode
      this.form = this.fb.group({
        // set author name
        author: [
          this.user.firstName + ' ' + this.user.lastName,
          Validators.required,
        ],
        // set start date depending on date clicked
        startDate: [this.data.startDate, Validators.required],
        endDate: ['', Validators.required],
        // set platform Id for the student
        platformId: [this.student.platformId, Validators.required],
        // set student id
        studentId: [this.student.id, Validators.required],
        // description for this
        description: ['', Validators.required],
      });
    } else {
      // populate vacation data in edit mode
      this.fillVacationData();
    }
  }

  ngOnInit(): void {}

  // show the start date selected
  startDate($event) {
    console.log($event);
  }
  // show the end date selected
  endtDate($event) {
    console.log($event);
  }

  mutateVacation() {
    if (this.data.mode === ADD) {
      this.addVacation();
    } else {
      this.editVacation();
    }
  }
  addVacation() {
    // as the dialog closes, emit form values with date formating
    this.dialogRef.close({
      author: this.form.controls.author.value,
      startDate: formatYYYYDDMM(this.form.controls.startDate.value),
      endDate: formatYYYYDDMM(this.form.controls.endDate.value),
      platformId: this.form.controls.platformId.value,
      studentId: this.form.controls.studentId.value,
      description: this.form.controls.description.value,
      mode: this.data.mode,
      // id: this.data.id
    });
  }

  // triggers in edit mode
  editVacation() {
    this.dialogRef.close({
      author: this.form.controls.author.value,
      startDate: formatYYYYDDMM(this.form.controls.startDate.value),
      endDate: formatYYYYDDMM(this.form.controls.endDate.value),
      platformId: this.form.controls.platformId.value,
      studentId: this.form.controls.studentId.value,
      description: this.form.controls.description.value,
      mode: this.data.mode,

      id: this.data.vacation.id,
    });
  }

  // only when on edit mode
  fillVacationData() {
    // change the heading of the pop up
    this.addOrEdit = 'Edit';
    // edit mode
    this.form = this.fb.group({
      // set author name
      author: [
        this.user.firstName + ' ' + this.user.lastName,
        Validators.required,
      ],
      // set start date
      startDate: [this.data.vacation['startDate'], Validators.required],
      // set start date

      endDate: [this.data.vacation['endDate'], Validators.required],
      // set platform Id for the student
      platformId: [this.student.platformId, Validators.required],
      // set student id
      studentId: [this.student.id, Validators.required],
      // description for this
      description: [this.data.vacation['description'], Validators.required],
    });
  }
  // cancel button implementation
  cancel() {
    this.dialogRef.close();
  }
}
