import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'Select' | 'Random';
  startDate: string;
  endDate: string
  bookingForm: FormGroup;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    this.init();
    if (this.selectedMode === 'Random') {
      this.startDate = new Date(
        availableFrom.getTime()
        +
        Math.random()
        *
        (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())).toISOString();
      this.endDate = new Date(
        new Date(this.startDate).getTime()
        +
        Math.random()
        *
        (new Date(this.startDate).getTime() + 6 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime())).toISOString(); 
    }
    this.bookingForm = new FormGroup({
      'first_name': new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      'last_name': new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      'guest_no': new FormControl('2', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      'date_from': new FormControl(this.startDate, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      'date_to': new FormControl(this.endDate, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  private init() {
    
  }

  onCancel() {
    // ...
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    // ...
    if(!this.bookingForm.valid) {
      return;
    }

    this.modalCtrl.dismiss({ bookingData: {
      first_name: this.bookingForm.value.first_name,
      last_name: this.bookingForm.value.last_name,
      guest_no: this.bookingForm.value.guest_no,
      date_from: this.bookingForm.value.date_from,
      date_to: this.bookingForm.value.date_to
    } }, 'confirm');
  }

}
