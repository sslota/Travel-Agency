import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FireBaseService } from '../firebase.service';
import { Trip } from '../trip.interface';
import { CartInfoService } from '../cart-info.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  trips: any[] = [];
  tripsSub: Subscription | undefined;

  constructor(
    public cartService: CartInfoService,
    private fb: FireBaseService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.tripsSub = this.fb.getTrips().subscribe((change) => {
      this.trips = change as Trip[];
    });
  }

  ngOnDestroy(): void {
    this.tripsSub?.unsubscribe();
  }

  scrollToTop(): void {
    window.scroll(0, 0);
  }

  countTripInCart(trip: Trip): number {
    return this.cartService.cart.filter(item => item.id === trip.id).length;
  }

  createRange(n: number): number[] {
    return Array.from({length: n}, (_, i) => i);
  }

  getCartValue(): number {
    return this.cartService.cart.reduce((sum, trip) => sum + trip.price, 0);
  }

  addClick(trip: Trip): void {
    if (!this.auth.userRoles?.client) {
      window.alert('Must be logged in');
      return;
    }
    if (this.countTripInCart(trip) < trip.maxSeats) {
      this.cartService.cart.push(trip);
    }
  }

  removeClick(trip: Trip): void {
    if (!this.auth.userRoles?.client) {
      window.alert('Must be logged in');
      return;
    }
    if (this.countTripInCart(trip) >= 1) {
      this.deleteTripOffCart(trip);
    }
  }

  deleteTripOffCart(trip: Trip): void {
    const idx = this.cartService.cart.findIndex(item => item.id === trip.id);
    if (idx !== -1) {
      this.cartService.cart.splice(idx, 1);
    }
  }

  getOrderedAmount(trips: Trip[]): number {
    return this.cartService.cart.length;
  }

  getMaxPriceTrip(trips: Trip[]): Trip {
    return trips.reduce((maxTrip, trip) => trip.price > maxTrip.price ? trip : maxTrip, trips[0]);
  }

  getMinPriceTrip(trips: Trip[]): Trip {
    return trips.reduce((minTrip, trip) => trip.price < minTrip.price ? trip : minTrip, trips[0]);
  }

  formSubmitEventHandler(trip: Trip): void {
    this.trips.push(trip);
  }

  ratingEventHandler(trip: Trip, ev: any): void {
    if (ev == 1) {
      trip.likes += 1;
    } else {
      trip.dislikes += 1;
    }
  }

  alertLogIn() {
    if (!this.auth.userRoles.client){
      window.alert('Must be logged in');
    }
  }
}
