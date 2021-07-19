import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private bookings: Booking[] = [];
    private bookingsChanged = new BehaviorSubject<Booking[]>([]);
    constructor(private authService: AuthService, private http: HttpClient) { }
    getBookings() {
        this.http.get<{ bookings: Booking[] }>(BACKEND_URL + 'bookings/' + this.authService.userId)
            .subscribe(responseData => {
                this.bookings = responseData.bookings;
                this.bookingsChanged.next(this.bookings);
            });
    }
    getBookingsStatusListener() {
        return this.bookingsChanged.asObservable();
    }
    createBooking(
        placeId: string,
        placeImage: string,
        placeTitle: string,
        guestNumber: number,
        first_name: string,
        last_name: string,
        bookedFrom: string,
        bookedTo: string
    ) {
        const bookData = {
            placeId: placeId,
            placeImage: placeImage,
            placeTitle: placeTitle,
            userId: this.authService.userId,
            guestNumber: guestNumber,
            first_name: first_name,
            last_name: last_name,
            bookedFrom: new Date(bookedFrom),
            bookedTo: new Date(bookedTo)
        };
        this.http.post<{ booking: Booking }>(BACKEND_URL + 'bookings/new-booking', bookData)
            .subscribe(responseData => {
                this.bookings.push(responseData.booking);
                this.bookingsChanged.next(this.bookings);
            });
    }
    deleteBooking(bookingId) {
        this.http.delete<{ message: string }>(BACKEND_URL + 'booking/' + bookingId)
            .subscribe(responseData => {
                const updatedBookings = this.bookings.filter(p => p._id !== bookingId);
                this.bookings = [...updatedBookings];
                this.bookingsChanged.next(this.bookings);
            });
    }
}