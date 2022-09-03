import { SpinnerService } from './../spinner.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  msg: string;
  unameAvailablity: boolean;
  constructor(
    public userSer: UsersService,
    public myRouter: Router,
    public spinnerSer: SpinnerService
  ) {}

  ngOnInit(): void {
    $('.toggle').click(() => {
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms
      $('.form').animate(
        {
          height: 'toggle',
          'padding-top': 'toggle',
          'padding-bottom': 'toggle',
          opacity: 'toggle',
        },
        'slow'
      );
    });
    this.loginForm = new FormGroup({
      Username: new FormControl(null, Validators.required),
      Password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  get userNameCtrl() {
    return this.loginForm.get('Username');
  }

  get pwdCtrl() {
    return this.loginForm.get('Password');
  }

  getUserData() {
    this.loginForm.patchValue({
      Username: 'gold',
    });
  }
  checkUsername(uname: string) {
    this.spinnerSer.isLoading.next(true);
    this.userSer.checkAvailablity(uname).subscribe({
      next: (res: number) => {
        if (res > 0) {
          this.unameAvailablity = false;
          this.spinnerSer.isLoading.next(false);
          return;
        }
        this.unameAvailablity = true;
        this.spinnerSer.isLoading.next(false);
      },
      error: (err: any) => {
        console.log(err);
        this.spinnerSer.isLoading.next(false);
      },
    });
  }
  doRegisteration(formData: NgForm) {
    this.userSer.userRegisteration(formData.value).subscribe({
      next: (res: string) => {
        this.msg = res;
        formData.reset();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  doLogin() {
    this.userSer.doLogin(this.loginForm.value).subscribe({
      next: (res: string) => {
        if (res.length != 0) {
          localStorage.setItem('loggedUser', res);
          this.myRouter.navigateByUrl('/');
          return;
        }
        this.msg = 'Invalid Username / Password';
      },
      error: (err: any) => {
        console.log(err);
        this.msg = 'Something went wrong!';
      },
    });
  }
}
