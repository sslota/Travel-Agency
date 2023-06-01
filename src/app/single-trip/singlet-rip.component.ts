import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { FireBaseService } from '../firebase.service';
import { Trip } from '../trip.interface';

interface review {
  nick: string;
  date: string;
  review: string;
}

@Component({
  selector: 'app-singletrip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css'],
})
export class SingletripComponent implements OnInit {
  private subscription: Subscription | undefined;
  id: number = -1;
  trip: Trip[] = [];
  selected: number = 0;
  reviews: review[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FireBaseService
  ) {}

  ngOnInit(): void {
    window.scroll(0,0);
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.fb
        .getTrips()
        .pipe(first())
        .subscribe((trips: any[]) => {
          let trip: any;
          for (let d of trips) {
            if (d.id == this.id) {
              trip = d;
              break;
            }
          }
          this.trip.push(trip as Trip);
        });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  nextPhoto(): void {
    if (this.selected == this.trip[0].imageLink.length - 1) this.selected = 0;
    else {
      this.selected += 1;
    }
  }

  previousPhoto(): void {
    if (this.selected >= 1) this.selected -= 1;
    else {
      this.selected = this.trip[0].imageLink.length - 1;
    }
  }

  addReview(newReview: review): void {
    this.reviews.push(newReview);
  }

  ratingEventHandler(trip: Trip, ev: any): void {
    if (ev == 1) {
      trip.likes += 1;
    } else {
      trip.dislikes += 1;
    }
  }
}
