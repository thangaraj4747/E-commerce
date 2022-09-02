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
  constructor(public userSer: UsersService, public myRouter: Router) {}

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

  getData() {
    this.loginForm.patchValue({
      Username: 'gold',
    });
  }
  checkUsername(uname: string) {
    this.userSer.checkAvailablity(uname).subscribe({
      next: (res: number) => {
        if (res > 0) {
          this.unameAvailablity = false;
          return;
        }
        this.unameAvailablity = true;
      },
      error: (err: any) => {
        console.log(err);
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
          localStorage.setItem('loggedKey', res);
          this.myRouter.navigateByUrl('/');
          return;
        }
        this.msg = 'Invalid credential / Something went wrong';
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
