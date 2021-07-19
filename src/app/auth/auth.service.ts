import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean =  true;
  userId:string = 'xyz';
  constructor(private router: Router, private navCtrl: NavController) { }
  

  getUserIsAuthenticated(){
    return this.isAuthenticated;
  }
  login(){
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigateByUrl('/auth');
  }
}
