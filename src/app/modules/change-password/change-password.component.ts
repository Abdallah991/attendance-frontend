import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  // loader
  loader = false;
  // dialog variables
  // new pasword is not 6 letters long
  dialogTitle = 'Old Password is Incorrect!';
  message = 'Please try to enter your credengtials again!!';
  button2 = 'Dismiss';

  constructor(
    private fb: FormBuilder,
    private AS: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['',[Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]],

      // * Adding a custome validator to check both values match
    }, { validator: this.matchValues('newPassword', 'confirmNewPassword') });
  }

  ngOnInit(): void {}

  isValid = (controlName) =>
    this.form.controls[controlName].touched &&
    this.form.controls[controlName].errors
      ? true
      : false;

  async changePassword() {
    this.loader = true;

    this.AS.changePassword(
      this.form.controls.oldPassword.value,
      this.form.controls.newPassword.value
    )
      .then((val) => {
        this.dialogTitle = 'Your password has been updated!';
        this.message = 'Next time you login use your new password!!';
        this.button2 = 'Back';
        this.showDialog;
        this.loader = false;
        this.showDialog();
      })
      .catch((err) => {
        console.log('the login was ', err);
        this.loader = false;
        this.dialogTitle = 'Old Password is Incorrect!';
        this.message = 'Please try to enter your credengtials again!!';
        this.button2 = 'Dismiss';
        this.showDialog();
      });
  }

  // ? dialog
  // Fail and error dialog
  async showDialog() {
    document.querySelector<HTMLElement>('#dialog')?.click();
  }
  // dismiss dialog
  // If change password successful navigate back to students
  // if change password failed clear the form
  async dismiss() {
    if (this.button2 === 'Back') {
      this.router.navigateByUrl('/students');
    } else {
      this.form.controls.oldPassword.setValue('');
      this.form.controls.newPassword.setValue('');
    }
  }


  // * Check both passed form controls equal in value
   matchValues(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
