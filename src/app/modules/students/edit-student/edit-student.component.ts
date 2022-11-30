import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GENDERS, SUPPORTED_BY_TAMKEEN } from 'src/app/constants/constants';
import { formatYYYYDDMM } from 'src/app/constants/globalMethods';
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
  title = 'Add Student';
  buttonTitle = 'Add Student';
  studentForm: FormGroup;
  // single drop down options
  genders = GENDERS;
  cohortsData: SelectData[] = [];
  supportedByTamkeenData: SelectData[] = SUPPORTED_BY_TAMKEEN;
  // type of form
  type: 'view' | 'create';
  // studen
  student: Student = null;
  // button loader
  loader = false;
  // confirmation dialog
  dialogTitle = '';
  message = '';
  button = '';
  // preset values
  genderPresetValue;
  tamkeenPreSetValue;
  cohortPreSetValue;
  // drop down disable
  disabled = false;

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
      cohortId: ['', Validators.required],
      supportedByTamkeen: ['', Validators.required],
      email: ['', Validators.required],
      // TODO: see how these can fit in later
      // password: [''],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      // studentLogs: [''],
    });

    this.fetchDataFromRouter();
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

  mutateStudent() {
    this.loader = true;
    if (this.type == 'create') {
      this.addStudent();
    } else {
      this.editStudent();
    }
  }

  addStudent() {
    this.SS.addStudent(this.studentForm.value)
      .then((val) => {
        this.showSuccessDialog(
          'Success!',
          'The student has been added successfully',
          'Dismiss'
        );
        this.loader = false;
      })
      .catch((err) => {
        console.log('ERROR ', err);
        this.showSuccessDialog('Failure!', 'There was an Error', 'Dismiss');
      });
  }

  editStudent() {
    var studentUpdateInput = {
      id: this.student.id,
      firstName: this.studentForm.controls.firstName.value,
      lastName: this.studentForm.controls.lastName.value,
      cohortId: this.studentForm.controls.cohortId.value,
      supportedByTamkeen: this.studentForm.controls.supportedByTamkeen.value,
      email: this.studentForm.controls.email.value,
      dob: this.studentForm.controls.dob.value,
      phone: this.studentForm.controls.phone.value,
      gender: this.studentForm.controls.gender.value,
      nationality: this.studentForm.controls.nationality.value,
    };
    this.SS.updateStudent(studentUpdateInput)
      .then((val) => {
        this.showSuccessDialog(
          'Success!',
          'The student has been updated successfully',
          'Dismiss'
        );
        this.loader = false;
      })
      .catch((err) => {
        console.log('ERROR ', err);
        this.showSuccessDialog('Failure!', 'There was an Error', 'Dismiss');
      });
  }

  // get the value of single select
  genderSelected(event) {
    this.studentForm.controls.gender.setValue(event);
  }
  cohortSelected(event) {
    this.studentForm.controls.cohortId.setValue(event);
  }
  supportedByTamkeen(event) {
    this.studentForm.controls.supportedByTamkeen.setValue(event);
  }

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
        this.title = 'Edit Student';
        this.buttonTitle = 'Edit Student';
        this.student = response.student;
        console.log(response);
        // set the food info
        this.setStudentInfo();
        //
      }
    });
  }

  // set student info to feilds
  async setStudentInfo() {
    // date of birth formatting
    var dob = formatYYYYDDMM(new Date(this.student.dob));

    this.studentForm.patchValue({
      firstName: this.student.firstName,
      lastName: this.student.lastName,
      gender: this.student.gender,
      phone: this.student.phone,
      email: this.student.email,
      supportedByTamkeen: this.student.supportedByTamkeen,
      cohortId: this.student.cohortId,
      nationality: this.student.nationality,
    });

    // setting the manula values
    this.studentForm.controls.dob.setValue(dob);
    this.cohortPreSetValue = this.student.cohortId;
    this.genderPresetValue = this.student.gender;
    this.tamkeenPreSetValue = this.student.supportedByTamkeen;

    this.disabled = true;
  }

  // success dialog

  //
  // dialog work
  // show dialoge
  async showSuccessDialog(title, message, button) {
    this.dialogTitle = title;
    this.message = message;
    this.button = button;
    document.querySelector<HTMLElement>('#dialog')?.click();
  }
  // dismiss dialog implementation
  navigateBack() {
    this.router.navigateByUrl('/students');
  }
}
