import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaceService } from '../../place.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  offerForm: FormGroup;
  constructor(private placeService: PlaceService, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.offerForm = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCreateOffer() {
    // console.log(this.offerForm);
    if (!this.offerForm.valid) {
      return;
    }
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please wait...' })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          const title = this.offerForm.value.title;
          const description = this.offerForm.value.description;
          const price = this.offerForm.value.price;
          const availableFrom = this.offerForm.value.dateFrom;
          const availableTo = this.offerForm.value.dateTo;
          this.placeService.createOffer(title, description, price, availableFrom, availableTo);
          loadingEl.dismiss();
          this.offerForm.reset();
          this.router.navigateByUrl('/places/tabs/offers');
        }, 2000);
      });
  }

}
