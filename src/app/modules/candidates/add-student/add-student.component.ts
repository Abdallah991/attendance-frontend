import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GENDERS } from 'src/app/constants/constants';
import { Student } from 'src/app/models/Student';
import { CandidatesService } from '../services/candidates.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  // Title to toggle between add and edit
  title = 'Add Student';
  buttonTitle = 'Add Student';
  studentForm: UntypedFormGroup;
  // single drop down options
  genders = GENDERS;
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

  // drop down disable
  disabled = false;

  constructor(
    private fb: FormBuilder,
    private CS: CandidatesService,
    private router: Router,
    private AR: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // form
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      joinDate: [''],
      email: [''],
      // TODO: see how these can fit in later
      dob: [''],
      phone: [''],
      gender: [''],
      platformId: ['', Validators.required],
      studentId: ['', Validators.required],
      nationality: [''],
      acadamicQualification: [''],
      acadamicSpecialization: [''],
      scholarship: [''],
      cohortId: [''],

      // studentLogs: [''],
    });

    this.fetchDataFromRouter();
  }

  ngOnInit(): void {}

  async mutateUser() {
    this.loader = true;
    if (this.type == 'create') {
      this.addStudent();
    } else {
      this.viewStudent();
    }
  }

  // add user to the system implementation
  async addStudent() {
    // TODO: Check if the passwords match then allow the users registration
    var userInput = {
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
    // this.CS.addUser(userInput)
    //   .then((val) => {
    //     this.showSuccessDialog(
    //       'Success!',
    //       'The student has been added successfully',
    //       'Dismiss'
    //     );
    //     this.loader = false;
    //   })
    //   .catch((err) => {
    //     console.log('ERROR ', err);
    //     this.showSuccessDialog('Failure!', 'There was an Error!', 'Dismiss');
    //   });
  }

  // edit user to the system implementation
  async viewStudent() {
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
    // this.CS.updateUser(userInput)
    //   .then((val) => {
    //     this.showSuccessDialog(
    //       'Success!',
    //       'The student has been added successfully',
    //       'Dismiss'
    //     );
    //     this.loader = false;
    //   })
    //   .catch((err) => {
    //     console.log('ERROR ', err);
    //     this.showSuccessDialog('Failure!', 'There was an Error!', 'Dismiss');
    //   });
  }

  async fetchDataFromRouter() {
    this.AR.data.subscribe((response: any) => {
      // type of form from router
      this.type = response.type;
      if (this.type == 'view') {
        // get the food data
        // this.title = ' User';
        // this.buttonTitle = 'Edit User';
        // this.user = response.user;
        console.log(response);
        // set the food info
        this.setUserInfo();
        //
      }
    });
  }

  // set student info to feilds
  async setUserInfo() {
    // format the dates
    // var joinDate = formatYYYYDDMM(new Date(this.user.joinDate));
    // var dob = formatYYYYDDMM(new Date(this.user.dob));
    // this.usersForm.patchValue({
    //   firstName: this.user.firstName,
    //   lastName: this.user.lastName,
    //   gender: this.user.gender,
    //   phone: this.user.phone,
    //   email: this.user.email,
    //   password: this.user.password,
    //   confirmPassword: this.user.password,
    //   position: this.user.position,
    // });
    // // presetting the values
    // this.genderPresetValue = this.user.gender;
    // this.usersForm.controls.joinDate.setValue(joinDate);
    // this.usersForm.controls.dob.setValue(dob);
    // this.disabled = true;
  }

  // cancel button implementation
  async cancel() {
    this.router.navigate(['/users']);
  }

  async navigateBack() {
    this.router.navigateByUrl('/users');
  }

  // set the gender value to the form when selected
  genderSelected(event) {
    this.studentForm.controls.gender.setValue(event);
  }

  // form Validation return value
  isValid = (controlName) =>
    this.studentForm.controls[controlName].touched &&
    this.studentForm.controls[controlName].errors
      ? true
      : false;

  // show dialoge
  async showSuccessDialog(title, message, button) {
    this.dialogTitle = title;
    this.message = message;
    this.button = button;
    document.querySelector<HTMLElement>('#dialog')?.click();
  }
}
