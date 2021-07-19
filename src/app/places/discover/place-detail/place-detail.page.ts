import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlaceService } from '../../place.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { BookingService } from 'src/app/bookings/booking.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  isBooking = false;
  placeId: string;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['placeId']) {
          this.placeId = params['placeId'];
          this.loadingCtrl.create({message: 'Loading...'})
          .then(loadingEl => {
            loadingEl.present()
            this.placeService.getPlace(this.placeId).subscribe(
              responseData => {
                loadingEl.dismiss();
                this.place = responseData.place;
                this.isBooking = this.place.userId !== this.authService.userId;
              }
            );
          });
          
        } else {
          this.navCtrl.navigateBack(['/places', 'tabs', 'discover']);
          return;
        }
      }
    );
    
  }
  onBookPlace() {
    this.actionSheetCtrl.create({
      header: "Choose an Action",
      buttons: [
        {
          text: 'Select a Date',
          handler: () => {
            this.openBookingModal('Select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('Random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openBookingModal(mode: 'Select' | 'Random') {
    console.log(mode);
    this.modalCtrl.create({ component: CreateBookingComponent, componentProps: { selectedPlace: this.place, selectedMode: mode } })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role); 

        if (resultData.role === 'confirm') {
          this.loadingCtrl.create({ keyboardClose: true, message: 'Booking now...' })
            .then(loadingEl => {
              loadingEl.present();
              setTimeout(() => {
                const data = resultData.data.bookingData;
                this.bookingService.createBooking(
                  this.place._id,
                  this.place.imageUrl,
                  this.place.title,
                  data.guest_no,
                  data.first_name,
                  data.last_name,
                  data.date_from,
                  data.date_to
                );

                loadingEl.dismiss();
              }, 2000);
            });
        }

      });
  }

}
