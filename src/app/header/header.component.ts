import { Router } from '@angular/router';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public userSer: UsersService, public myRouter: Router) {}

  ngOnInit(): void {}
  doLogout() {
    localStorage.clear();
    this.myRouter.navigateByUrl('/login');
  }
}
