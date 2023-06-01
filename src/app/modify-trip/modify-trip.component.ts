import { Component, OnInit } from '@angular/core';
import { 
  FormGroup, 
  FormControl, 
  Validators, 
  ValidatorFn, 
  AbstractControl, 
  ValidationErrors 
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FireBaseService } from '../firebase.service';

@Component({
  selector: 'app-modify-trip',
  templateUrl: './modify-trip.component.html',
  styleUrls: ['./modify-trip.component.css'],
  providers: [DatePipe]
})

export class ModifyTripComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FireBaseService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  id: any = null;
  trip: any = null;
  subscription: Subscription | undefined;
  showError = false;
  showOk = false;

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.fb
    .getTrips()
    .pipe(first())
    .subscribe((trips: any[]) => {
      for (let d of trips) {
        if (d.id == this.id) {
          this.tripModifyForm.patchValue(d)
          this.trip = d;
          break;
        }
      }});
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  validateDates: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('tripStartDate')!.value;
    const endDate = control.get('tripEndDate')!.value;
    if (startDate && endDate && endDate < startDate) {
      return {
        invalidDates: true
      };
    }
    return null;
  };

  tripModifyForm = new FormGroup({
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
      Validators.minLength(1),
    ]),
  }, { validators: this.validateDates });

  getFormValidationErrors(form: any) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  submitForm() {
    if (!this.tripModifyForm.valid) {
      this.showError = true;
      return;
    }
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
        let imageLinks = this.tripModifyForm.get('tripImageLink')!.value.split(',');
        let dataToUpdate = {
          name: this.tripModifyForm.get('tripName')!.value,
          destination: this.tripModifyForm.get('tripDestination')!.value,
          startDate: this.tripModifyForm.get('tripStartDate')!.value,
          endDate: this.tripModifyForm.get('tripEndDate')!.value,
          maxSeats: this.tripModifyForm.get('tripMaxSeats')!.value,
          price: parseFloat(this.tripModifyForm.get('tripPrice')!.value),
          shortDesc: this.tripModifyForm.get('tripShortDesc')!.value,
          imageLink: imageLinks,
        };
        try{
          this.fb.updateTrip(dataToUpdate, this.id)
        }catch(err){
          window.alert(err)
        }
        this.showError = false;
        this.showOk = true;
        this.tripModifyForm.reset();
      });
    this.router.navigate(['/manager/'])
  }
}
