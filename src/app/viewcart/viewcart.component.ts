import { Router } from '@angular/router';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.scss'],
})
export class ViewcartComponent implements OnInit {
  constructor(public userSer: UsersService, public myRouter: Router) {}

  ngOnInit(): void {
    this.userSer.getMyCartItem().subscribe({
      next: (data: any[]) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        this.myRouter.navigateByUrl('/');
      },
    });
  }
}
