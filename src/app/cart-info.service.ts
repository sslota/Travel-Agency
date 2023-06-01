import { Injectable } from '@angular/core';
import { Trip } from './trip.interface';

@Injectable({
  providedIn: 'root',
})
export class CartInfoService {
  constructor() {}

  cart: Trip[] = [];
}
