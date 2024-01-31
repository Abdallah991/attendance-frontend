import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/Student';
import { StudentsService } from '../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectData } from 'src/app/interfaces/interfaces';
import { Cohort } from 'src/app/models/Cohort';
import {
  HIGHEST_DEGREE,
  MARITAL_STATUS,
  OCCUPATION,
  SP,
  SPONSORSHIP,
  YESNO,
} from 'src/app/constants/constants';

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
  maritalStatusSelectedData: SelectData[] = MARITAL_STATUS;
  highestDegreeSelectedData: SelectData[] = HIGHEST_DEGREE;
  occupationSelectedData: SelectData[] = OCCUPATION;
  sponsorshipSelectedData: SelectData[] = SPONSORSHIP;
  yesNoSelectedData: SelectData[] = YESNO;
  spSelectedData: SelectData[] = SP;
  cohorts: Cohort[] = [];
  // student
  student: Student = null;
  // loader of button
  addLoader: boolean = false;
  // confirmation dialog
  dialogTitle = '';
  message = 'One Extra Rebooter!!';
  button = 'Back';
  button2 = 'Dismiss';
  // preset values
  cohortPreSetValue = 2;
  spValue = 4;
  maritalStatusValue = 'Single';
  occuppationValue = 'Student';
  degreeValue = 'High School';
  sponsorshipValue = 'Tamkeen';
  discordValue = 'No';
  unipalValue = 'No';
  trainMeValue = 'No';
  graduationDate = '';
  // platformID error
  platformIdError = false;

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
      cpr: ['', Validators.required, , Validators.min(9), Validators.max(11)],
      platformId: ['', Validators.required],
      studentId: ['', Validators.required],
      academicSpecialization: ['', Validators.required],
      cohortId: [this.cohortPreSetValue, Validators.required],
      maritalStatus: ['', Validators.required],
      occupation: ['', Validators.required],
      highestDegree: ['', Validators.required],
      sponsorship: ['', Validators.required],
      discord: ['', Validators.required],
      unipal: ['', Validators.required],
      trainMe: ['', Validators.required],
      graduationDate: ['', Validators.required],
      academicInstitute: ['', Validators.required],
      currentJobTitle: ['', Validators.required],
      companyNameAndCr: ['', Validators.required],
      sp: ['', Validators.required],
    });

    // get cohort data from resolver
    this.AR.data.subscribe((data) => {
      this.cohorts = data.cohorts.data.cohorts;
      console.log(this.cohorts);
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
    this.platformIdError = false;
    this.studentForm.disable();
    var studentInput = {
      lastName: this.studentForm.controls.lastName.value,
      id: this.studentForm.controls.studentId.value,
      platformId: this.studentForm.controls.platformId.value,
      firstName: this.studentForm.controls.firstName.value,
      cpr: this.studentForm.controls.cpr.value,
      academicSpecialization:
        this.studentForm.controls.academicSpecialization.value,
      cohortId: this.studentForm.controls.cohortId.value,
      // cohort
      maritalStatus: this.maritalStatusValue,
      occupation: this.occuppationValue,
      highestDegree: this.degreeValue,
      sponsorship: this.sponsorshipValue,
      discord: this.discordValue,
      unipal: this.unipalValue,
      trainMe: this.trainMeValue,
      // ? add this date
      graduationDate: this.graduationDate,
      academicInstitute: this.studentForm.controls.academicInstitute.value,
      currentJobTitle: this.studentForm.controls.currentJobTitle.value,
      companyNameAndCr: this.studentForm.controls.companyNameAndCr.value,
      sp: this.spValue,
    };
    console.log(studentInput);
    await this.SS.addStudent(studentInput)
      .then((student) => {
        // if the api call is successful
        this.student = new Student(student.data.student);
        this.studentForm.reset();
        this.dialogTitle =
          this.student.firstName +
          ' ' +
          this.student?.lastName +
          ' Has been Added!';
      })
      .catch((err) => {
        console.log('the error value is ', err);
        // this.dialogTitle =
        //   'There is no user with platform ID of ' + studentInput.platformId;
        // this.message = 'Make sure you have the correct ID';
      })
      .finally(() => {
        this.studentForm.enable();
        this.addLoader = false;
        this.studentForm.controls.cohortId.setValue(this.cohortPreSetValue);
        this.showDialog();
      });
  }

  async navigateBack() {
    this.router.navigateByUrl('/students');
  }

  async dismiss() {}

  // set the gender value to the form when selected
  cohortSelected(event: number) {
    this.studentForm.controls.cohortId.setValue(event);
  }

  // form Validation return value
  // TODO: Add when needed
  isValid = (controlName) =>
    this.studentForm.controls[controlName].touched &&
    this.studentForm.controls[controlName].errors
      ? true
      : false;

  // Fail and error dialog
  async showDialog() {
    document.querySelector<HTMLElement>('#dialog')?.click();
  }

  // select status
  spOnChange($event) {
    this.spValue = Number($event);
    console.log(this.spValue);
  }
  maritalStatusChange($event) {
    this.maritalStatusValue = this.maritalStatusSelectedData.find(
      (option) => option.id === Number($event)
    ).text;
    console.log(this.maritalStatusValue);
  }
  occupationChange($event) {
    this.occuppationValue = this.occupationSelectedData.find(
      (option) => option.id === Number($event)
    ).text;
    console.log(this.occuppationValue);
  }
  degreeChange($event) {
    this.degreeValue = this.highestDegreeSelectedData.find(
      (option) => option.id === Number($event)
    ).text;
    console.log(this.degreeValue);
  }
  sponsorshipChange($event) {
    this.sponsorshipValue = this.sponsorshipSelectedData.find(
      (option) => option.id === Number($event)
    ).text;
    console.log(this.sponsorshipValue);
  }

  unipalChange($event) {
    this.unipalValue = this.yesNoSelectedData.find(
      (option) => option.id === Number($event)
    ).text;
    console.log(this.unipalValue);
  }

  discordChange($event: any) {
    this.discordValue = this.yesNoSelectedData.find(
      (option) => option.id === Number($event)
    ).text;
    console.log(this.discordValue);
  }

  trainMeChange($event) {
    this.trainMeValue = this.yesNoSelectedData.find(
      (option) => option.id === Number($event)
    ).text;
    console.log(this.trainMeValue);
  }

  graduationDataSelected($date) {
    this.graduationDate = $date;
  }
}
