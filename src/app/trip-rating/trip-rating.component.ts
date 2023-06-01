import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css'],
})
export class TripRatingComponent implements OnInit {
  constructor() {}

  @Output() ratingChanged = new EventEmitter<number>();
  @Input() tripLikes = 0;
  @Input() tripDislikes = 0;

  alreadyVoted = false;

  ngOnInit(): void {}

  ratingApplied(op: string) {
    if (this.alreadyVoted) {
      return;
    }
    if (op === '+') {
      this.ratingChanged.emit(1);
    } else {
      this.ratingChanged.emit(-1);
    }
    this.alreadyVoted = true;
  }
}
