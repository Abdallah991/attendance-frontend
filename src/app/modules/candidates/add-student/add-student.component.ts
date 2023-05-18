import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  usersForm: FormGroup;
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
    this.usersForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      joinDate: ['', Validators.required],
      email: ['', Validators.required],
      position: ['', Validators.required],
      // TODO: see how these can fit in later
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      // studentLogs: [''],
    });

    this.fetchDataFromRouter();
  }

  ngOnInit(): void {}

  async mutateUser() {
    this.loader = true;
    if (this.type == 'create') {
      this.addUser();
    } else {
      this.editUser();
    }
  }

  // add user to the system implementation
  async addUser() {
    // TODO: Check if the passwords match then allow the users registration
    var userInput = {
      firstName: this.usersForm.controls.firstName.value,
      lastName: this.usersForm.controls.lastName.value,
      joinDate: this.usersForm.controls.joinDate.value,
      password: this.usersForm.controls.password.value,
      email: this.usersForm.controls.email.value,
      dob: this.usersForm.controls.dob.value,
      phone: this.usersForm.controls.phone.value,
      gender: this.usersForm.controls.gender.value,
      position: this.usersForm.controls.position.value,
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
  async editUser() {
    // TODO: Check if the passwords match then allow the users registration
    var userInput = {
      firstName: this.usersForm.controls.firstName.value,
      lastName: this.usersForm.controls.lastName.value,
      joinDate: this.usersForm.controls.joinDate.value,
      password: this.usersForm.controls.password.value,
      email: this.usersForm.controls.email.value,
      dob: this.usersForm.controls.dob.value,
      phone: this.usersForm.controls.phone.value,
      gender: this.usersForm.controls.gender.value,
      position: this.usersForm.controls.position.value,
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
        this.title = 'Edit User';
        this.buttonTitle = 'Edit User';
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
    this.usersForm.controls.gender.setValue(event);
  }

  // form Validation return value
  isValid = (controlName) =>
    this.usersForm.controls[controlName].touched &&
    this.usersForm.controls[controlName].errors
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
