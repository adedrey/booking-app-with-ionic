import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../place.service';
import { Place } from '../place.model';
import { Router } from '@angular/router';
import { NavController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers: Place[] = [] 
  constructor(private placeService: PlaceService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.placeService.getPlaces();
    this.placeService.getPlacesStatusListener()
    .subscribe(
      updatedOffers => {
        this.offers = updatedOffers;
      });
  }

  onEditItem(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    console.log(offerId);
    this.navCtrl.navigateForward(['/places', 'tabs', 'offers', 'edit', offerId]);
    // this.navCtrl.navigateForward('/places/tab/discover');
  }

}
