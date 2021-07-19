import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isAuthenticated: boolean = false;
  isLoading = false;
  authForm: FormGroup;
  constructor(private authServie: AuthService, private loadingCtrl: LoadingController, private navCtrl: NavController) { }

  ngOnInit() {
    this.init();
    this.isAuthenticated = this.authServie.getUserIsAuthenticated();
  }

  private init() {
    this.authForm = new FormGroup({
      'email': new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      'password': new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    console.log(this.authForm);
    this.isLoading = true;
    this.authServie.login();
    this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        this.isLoading = false;
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();

          this.navCtrl.navigateForward(['/places', 'tabs', 'discover']);
        }, 3000);
      })

  }

}
