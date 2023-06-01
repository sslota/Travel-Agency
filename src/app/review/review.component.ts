import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

interface review {
  nick: string;
  date: string;
  review: string;
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {

  @Output() newReviewEvent = new EventEmitter<review>();

  reviews: review[] = [];
  errorArray: any[] = [];

  addReview = new FormGroup({
    nickname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    date: new FormControl('', [
      Validators.required,
      this.dateBeforeTodayValidator
    ]),
    review: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(500),
    ]),
  });

  constructor(public auth: AuthService) {}

  submitForm() {
    let newReview = {
      nick: this.addReview.get('nickname')!.value,
      date: this.addReview.get('date')!.value,
      review: this.addReview.get('review')!.value,
    } as review;
    this.newReviewEvent.emit(newReview);
    this.addReview.reset();
  }

  isBanned(): boolean {
    return this.auth.userRoles.banned === true;
  }

  dateBeforeTodayValidator(control: FormControl): { [key: string]: any } | null {
    const date = new Date(control.value);
    const today = new Date();
    return date > today ? { dateBeforeToday: true } : null;
  }

  ngOnInit(): void {}
}
