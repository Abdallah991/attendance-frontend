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
  maritalStatusPreSetValue = 1;
  occupationPreSetValue = 1;
  degreePreSetValue = 1;
  sponsorshipPreSetValue = 1;
  discordPreSetValue = 1;
  unipalPreSetValue = 1;
  trainMePreSetValue = 1;
  // drop down actual values
  maritalStatusValue = 'Single';
  occuppationValue = 'Student';
  degreeValue = 'High School';
  sponsorshipValue = 'Tamkeen';
  discordValue = 'Yes';
  unipalValue = 'Yes';
  trainMeValue = 'Yes';
  graduationDate = '';
  // platformID error
  platformIdError = false;
  // role
  role;
  // type
  type: 'edit' | 'create';

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
      // console.log(this.cohorts);
      this.type = data.type;
      if (this.type == 'edit') {
        this.title = 'Edit Student';
        // get the data
        var student = data.student.data.student;
        this.student = student;
        this.setStudentValue(student);
      }
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
  async mutateStudent() {
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
      cohortId: this.cohortPreSetValue,
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
    if (this.type === 'create') {
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
    } else {
      await this.SS.updateStudent(studentInput)
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
  // * drop down events
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

  cohortOnChange($event) {
    this.cohortPreSetValue = Number($event);
    console.log(this.cohortPreSetValue);
  }

  graduationDataSelected($date) {
    this.graduationDate = $date;
  }

  // set students values in edit mode
  setStudentValue(data) {
    console.log(data);
    this.studentForm.controls.firstName.setValue(data.firstName);
    this.studentForm.controls.lastName.setValue(data.lastName);
    this.studentForm.controls.platformId.setValue(data.platformId);
    this.studentForm.controls.studentId.setValue(data.id);
    this.studentForm.controls.cpr.setValue(data.cpr);
    this.studentForm.controls.academicInstitute.setValue(
      data.academicInstitute
    );
    this.studentForm.controls.academicSpecialization.setValue(
      data.acadamicSpecialization
    );
    this.studentForm.controls.academicInstitute.setValue(
      data.academicInstitute
    );
    this.studentForm.controls.currentJobTitle.setValue(data.currentJobTitle);
    this.studentForm.controls.graduationDate.setValue(data.graduationDate);

    // get the sp value
    if (data.sp != null) {
      var sp = this.spSelectedData.find(
        (option) => option.id === Number(data.sp)
      ).id;
      this.spValue = Number(sp);
    }

    this.cohortPreSetValue = data.cohortId;
    // get the sp value
    if (data.maritalStatus != null) {
      var maritalStatus = this.maritalStatusSelectedData.find(
        (option) => option.text === data.maritalStatus
      ).id;
      this.maritalStatusPreSetValue = Number(maritalStatus);
    }
    if (data.occupation != null) {
      var occupation = this.occupationSelectedData.find(
        (option) => option.text === data.occupation
      ).id;
      this.occupationPreSetValue = Number(occupation);
    }
    if (data.highestDegree != null) {
      var highestDegree = this.highestDegreeSelectedData.find(
        (option) => option.text === data.highestDegree
      ).id;
      this.degreePreSetValue = Number(highestDegree);
    }
    if (data.sponsorship != null) {
      var sponsorship = this.sponsorshipSelectedData.find(
        (option) => option.text === data.sponsorship
      ).id;
      this.sponsorshipPreSetValue = Number(sponsorship);
    }
    if (data.unipal != null) {
      this.unipalPreSetValue = data.unipal;
    }
    if (data.discord != null) {
      this.discordPreSetValue = data.discord;
    }
    if (data.trainMe != null) {
      this.trainMePreSetValue = data.trainMe;
    }
  }
}
