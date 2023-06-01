import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartInfoService } from '../cart-info.service';
import { FireBaseService } from '../firebase.service';
import { Trip } from '../trip.interface';

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.css'],
})
export class ManagerPanelComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public cart: CartInfoService,
    private fb: FireBaseService
  ) { }

  trips: Trip[] = [];

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.fb.getTrips().subscribe((change) => {
      this.trips = change as Trip[];
    });
  }

  deleteTrip(idx: string) {
    this.fb.removeTrip(idx);
  }

  confirmDelete(idx: string) {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      this.deleteTrip(idx);
    }
  }

  isManager(): boolean {
    return this.auth.userRoles.manager === true;
  }
}
