import { Injectable } from '@angular/core';
import { RegisterationData } from './login/data/login.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  userRegisteration(data:RegisterationData) {
console.log(data);

  }
}
