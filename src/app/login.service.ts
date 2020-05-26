import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private loggedIn: string[] = [];

  login(user: string) {
    this.loggedIn.push(user);
  }

  logout() {
    this.loggedIn = [];
  }

  ifLoggedIn(user: string) {
    return this.loggedIn.includes(user);
  }
  ifSomebodyLoggedIn(): boolean {
    if (this.loggedIn.length>0){
      return true;
    }
    else{
      return false;
    }
  }
}
