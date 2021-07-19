import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../place.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places: Place[] = [];
  loadedPlaces: Place[] = [];
  relevantPlaces: Place[] = [];
  isLoading = false;
  constructor(private placeService: PlaceService, private authService: AuthService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.placeService.getPlaces();
    this.isLoading = true;
    this.loadingCtrl.create({keyboardClose: true, message: 'Loading...'})
    .then(loadingEl => {
      loadingEl.present()
      this.placeService.getPlacesStatusListener()
      .subscribe(
        newPlaces => {
          loadingEl.dismiss();
          this.isLoading = false;
          this.places = newPlaces;
          this.relevantPlaces = this.places;
          this.loadedPlaces = this.relevantPlaces.slice(1);
        }
      )
    });
    

  }
  onFilter(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.places;
      this.loadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.places.filter(p => p.userId !== this.authService.userId);
      this.loadedPlaces = this.relevantPlaces.slice(1);
    }
  }

}
