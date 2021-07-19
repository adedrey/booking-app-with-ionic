import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlaceService } from '../../place.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  placeId: string;
  place: Place;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private placeService: PlaceService
  ) { }
  editOfferForm: FormGroup
  ngOnInit() {
    this.init();
    this.route.params.subscribe(
      (params: Params) => {
        if (!params['placeId']) {
          this.navCtrl.navigateBack(['/places', 'tabs', 'offers']);
          return;
        }
        this.placeId = params['placeId'];
        this.loadingCtrl.create({ message: 'Loading...' })
          .then(loadingEl => {
            loadingEl.present();
            this.placeService.getPlace(this.placeId).subscribe(
              responseData => {
                  loadingEl.dismiss();
                  this.place = responseData.place;
                  this.editOfferForm.setValue({
                    title: this.place.title,
                    description: this.place.description
                  });
              }
            );
          })


      }
    )
  }

  private init() {
    this.editOfferForm = new FormGroup({
      'title': new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      'description': new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    if (!this.editOfferForm.valid) {
      return;
    }
    this.loadingCtrl.create({ keyboardClose: true, message: 'Please wait...' })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.placeService.updatePlace(this.placeId, this.editOfferForm.value.title, this.editOfferForm.value.description);
          loadingEl.dismiss();
          this.navCtrl.navigateBack(['/places', 'tabs', 'offers']);
        }, 2000);
      });
  }
}
