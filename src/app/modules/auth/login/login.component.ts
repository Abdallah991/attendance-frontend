import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Listen to all keybaord events
  @HostListener('window:keyup', ['$event']) keyUp(e: KeyboardEvent) {
    // When form is valid and clicked Enter
    if (e['code'] === 'Enter' && this.form.valid) {
      this.login();
    }
  }
  // title
  title: string = 'Login';
  // form
  form: FormGroup;
  // error message
  errorMsg = null;
  // loader
  loader = false;
  // dialog variables
  dialogTitle = 'Email or Password are Incorrect';
  message = 'Please try to enter your credengtials again!!';
  button2 = 'Dismiss';

  constructor(
    private fb: FormBuilder,
    private AS: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  isValid = (controlName) =>
    this.form.controls[controlName].touched &&
    this.form.controls[controlName].errors
      ? true
      : false;

  async login() {
    var token;
    this.loader = true;

    this.AS.login(
      this.form.controls.email.value,
      this.form.controls.password.value
    )
      .then((val) => {
        token = val.data['token'];
        // setting the user value
        console.log(val);
        sessionStorage.setItem('user', JSON.stringify(val.data.users));
        // setting the user id
        sessionStorage.setItem('userID', val.data.users.id);
        // setting the token
        sessionStorage.setItem('signinToken', token);
        // navigate to students page upon success
        this.router.navigateByUrl('/overview');
        this.loader = false;
      })
      .catch((err) => {
        console.log('the login was ', err);
        this.loader = false;
        this.showDialog();
      });
  }

  // ? dialog
  // Fail and error dialog
  async showDialog() {
    document.querySelector<HTMLElement>('#dialog')?.click();
  }
  // dismiss dialog
  async dismiss() {
    // TODO: clear credentials if needed
  }
}
