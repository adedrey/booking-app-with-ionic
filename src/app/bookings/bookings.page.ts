import { Component, OnInit } from '@angular/core';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[] = [];
  constructor(private bookingService: BookingService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.bookingService.getBookings();
    this.bookingService.getBookingsStatusListener()
    .subscribe(
      bookings => {
        this.bookings = bookings;
      }
    );
  }

  onDelete(bookingId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.loadingCtrl.create({message: 'Cancelling...'})
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.bookingService.deleteBooking(bookingId);
        loadingEl.dismiss();
      }, 1000);
    });
  }

}
