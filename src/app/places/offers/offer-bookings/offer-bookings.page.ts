import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { PlaceService } from '../../place.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {

  place: Place;
  private placeId: string;
  constructor(
    private placeService: PlaceService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.placeService.getPlaces();
    this.route.params.subscribe(
      (params: Params) => {
        if (!params['placeId']) {
          this.navCtrl.navigateBack(['/places', 'tabs', 'offers'])
          return;
        }
        this.loadingCtrl.create({ message: 'Loading...' })
          .then(loadingEl => {
            loadingEl.present();
            this.placeId = params['placeId'];
            this.placeService.getPlace(this.placeId);
              .subscribe(
                responseData => {
                  loadingEl.dismiss();
                  this.place = responseData.place;
                }
              );

          });
      }
    );
  }

  onEditPlace() {
    this.router.navigateByUrl('/places/tabs/offers/edit/' + this.placeId);
  }

}
