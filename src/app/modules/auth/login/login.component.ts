import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // title
  title: string = 'Login';
  // form
  form: FormGroup;
  // error message
  errorMsg = null;
  // loader
  loader = false;

  constructor(
    private fb: FormBuilder,
    private AS: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      // TODO: change the email and password address
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // form validation
  // TODO: Adding a way to refresh the calls when there is a token
  isValid = (controlName) =>
    this.form.controls[controlName].touched &&
    this.form.controls[controlName].errors
      ? true
      : false;

  async login() {
    // TODO: add the form validation condition
    this.loader = true;

    this.AS.login(
      this.form.controls.email.value,
      this.form.controls.password.value
    )
      .then((val) => {
        // that is it
        // console.log('the login was ', val);
        setTimeout(() => {
          this.loader = false;
          this.router.navigateByUrl('/students');
        }, 2000);
      })
      .catch((err) => {
        console.log('the login was ', err);
        this.loader = false;
      });
    // implement the login logic
  }
}
