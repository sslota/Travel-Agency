import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from '../auth.service';
import { FireBaseService } from '../firebase.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  orderHistoryIds: string[] = []
  orderHistory: any | undefined
  tripsArr: any[] = []
  selectedStatus = 'all';

  constructor(public auth: AuthService,
    public fb: FireBaseService) {}

  ngOnInit(): void {
    this.auth.getCurrentUserData().then(res=>{
    })
    this.fb
    .getOrderHistory$(this.auth.userData.uid)
    .pipe(first())
    .subscribe((data: any) =>{
      if(data){
        this.orderHistoryIds = Object.keys(data)
        this.orderHistory = data
      }
    });
    this.fb
    .getTrips()
    .pipe(first())
    .subscribe((trips: any[]) =>{
      this.tripsArr= []
      for (let d in trips){
        this.tripsArr.push(trips[d])
      }
    });
  }

  getTripNames(orderId: string): string{
      let name = "";
      for(let item of this.orderHistory[orderId].items){
        for(let d of this.tripsArr){
          if (d.id == item){
            name += d.name + ", ";
            break;
          }
        }
      }
      name = name.substring(0, name.length - 2);
      return name
  }

  getStatus(orderId: string): string {
    const currentDate = new Date();
    let status = "";
    for(const item of this.orderHistory[orderId].items){
      for(const d of this.tripsArr){
        const startDate = new Date(d.startDate);
        const endDate = new Date(d.endDate);
        if (d.id == item){
          if (currentDate > endDate) {
            status += 'Trip is over' + ', ';
          } else if (currentDate >= startDate && currentDate <= endDate) {
            status += 'Happening now' + ', ';
          } else if (currentDate < startDate) {
            status += 'Will start soon' + ', ';
          }
        }
      }
    }
    status = status.substring(0, status.length - 2);
    return status
  }
}