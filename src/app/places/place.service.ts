import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    private places: Place[] = [];
    private placesChanged = new BehaviorSubject<Place[]>([]);

    constructor(private router: Router, private authService: AuthService, private http: HttpClient) { }

    createOffer(title, description, price, availableFrom, availableTo) {
        const offerData = {
            title: title,
            description: description,
            imageUrl: 'https://i.pinimg.com/originals/f0/8d/48/f08d486df0cd1c3dd38cc4d6e7e5b145.jpg',
            price: price,
            availableFrom: new Date(availableFrom),
            availableTo: new Date(availableTo),
            userId: this.authService.userId
        };
        this.http.post<{ place: Place }>(BACKEND_URL + 'discover/offer/new-offer', offerData)
            .subscribe(
                responseData => {
                    this.places.push(responseData.place);
                    this.placesChanged.next(this.places);
                }, (error) => {
                    console.log('post-error', error)
                }
            );
    }

    getPlacesStatusListener() {
        return this.placesChanged.asObservable();
    }

    updatePlace(placeId: string, title: string, description: string) {
        const offerData = {
            title: title,
            description: description
        }
        this.http.post<{ place: Place }>(BACKEND_URL + 'discover/offer/' + placeId + '/edit', offerData)
            .subscribe(responseData => {
                const existingPlaces = [...this.places];
                const placeToUpdateId = this.places.findIndex(p => p._id === placeId);
                existingPlaces[placeToUpdateId] = responseData.place;
                this.places = [...existingPlaces];
                this.placesChanged.next(this.places);
            });

    }
    getPlace(offerId: string) {
        return this.http.get<{ place: Place }>(BACKEND_URL + 'discover/offer/' + offerId);
    }

    getPlaces() {
        this.http.get<{ places: Place[] }>(BACKEND_URL + 'discover/offers', {headers: {'content-type' : 'application/json'}})
            .subscribe(
                responseData => {
                    this.places = responseData.places;
                    this.placesChanged.next(this.places);
                }, (error) => {
                    console.log('post-error', error)
                }
            );
    }
}
