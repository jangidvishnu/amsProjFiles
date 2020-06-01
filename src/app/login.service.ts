import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private loggedIn: string[] = [];
  private loggedInRoute:string;

  login(user: string) {
    this.loggedIn.push(user);
    if(user=='admin'){
      this.loggedInRoute=user;
    }
    else{
      this.loggedInRoute=user.slice(0,8)+'/'+user.slice(10);
    }
  }

  logout() {
    this.loggedIn = [];
    this.loggedInRoute="";
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
  getLoggedInRoute():string
  {
    return this.loggedInRoute;
  }
}
