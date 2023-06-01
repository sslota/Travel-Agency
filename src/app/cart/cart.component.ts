import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartInfoService } from '../cart-info.service';
import { FireBaseService } from '../firebase.service';
import { Trip } from '../trip.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    public cartService: CartInfoService,
    private router: Router,
    public auth: AuthService,
    public fb: FireBaseService
  ) {}

  ngOnInit(): void {
    window.scroll(0,0);
  }

  getCartSum(): number {
    let s = 0;
    for (let item of this.cartService.cart) {
      s += item.price;
    }
    return s;
  }

  getCartIdsOnly(): string[]{
    let ids: string[] = []
    for (let item of this.cartService.cart) {
      ids.push(String(item.id))
    }
    return ids
  }

  order(): void {
    if(this.cartService.cart.length <= 0) {
      return;
    }
    this.fb.pushOrder(this.getCartIdsOnly(), this.auth.userData.uid);
    window.alert('Successfully Booked');
    this.cartService.cart = [];
    this.router.navigate(['trips']);
  }

  removeClick(trip: Trip): void {
      this.deleteTripOffCart(trip);
  }

  deleteTripOffCart(trip: Trip): void {
    let idx = 0;
    for (let item of this.cartService.cart) {
      if (item.id == trip.id) {
        this.cartService.cart.splice(idx, 1);
        return;
      }
      idx += 1;
    }
  }
}
