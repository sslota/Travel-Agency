import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FireBaseService } from '../firebase.service';
import { Trip } from '../trip.interface';
@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css'],
})
export class TripAddComponent implements OnInit {
  showError = false;
  showOk = false;

  constructor(private fb: FireBaseService, private auth: AuthService) {}

  ngOnInit(): void {}

  validateDates: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
    const startDate = control.get('tripStartDate')!.value;
    const endDate = control.get('tripEndDate')!.value;
    if (startDate && endDate && endDate < startDate) {
      return {
        invalidDates: true
      };
    }
    return null;
  };

  tripAddForm = new FormGroup({
    tripName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    tripDestination: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    tripStartDate: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    tripEndDate: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    tripMaxSeats: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*'),
    ]),
    tripPrice: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*.?[0-9]+'),
    ]),
    tripShortDesc: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    tripImageLink: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  }, { validators: this.validateDates });

  submitForm() {
    if (!this.auth.userRoles.manager) return;
    if (!this.tripAddForm.valid) {
      this.showError = true;
      return;
    }
    let imageLinks = this.tripAddForm.get('tripImageLink')!.value.split(',');
    let newTrip = {
      name: this.tripAddForm.get('tripName')!.value,
      destination: this.tripAddForm.get('tripDestination')!.value,
      startDate: this.tripAddForm.get('tripStartDate')!.value,
      endDate: this.tripAddForm.get('tripEndDate')!.value,
      maxSeats: this.tripAddForm.get('tripMaxSeats')!.value,
      price: parseFloat(this.tripAddForm.get('tripPrice')!.value),
      shortDesc: this.tripAddForm.get('tripShortDesc')!.value,
      imageLink: imageLinks,
      currency: '$',
      likes: 0,
      dislikes: 0,
    } as Trip;
    this.fb.addTrip(newTrip);
    this.showError = false;
    this.showOk = true;
    this.tripAddForm.reset();
  }
}
