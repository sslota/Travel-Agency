import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Trip } from './trip.interface';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  trips: Observable<any[]>;
  private nextId: number | undefined;

  constructor(private db: AngularFireDatabase) {
    this.trips = this.db.list('trips').valueChanges();
    this.db.list('trips', ref=> ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {
      this.nextId = res[0]?.id + 1
    })
  }

  getTrips(): Observable<any[]> {
    return this.trips;
  }

  addTrip(trip: Trip): void{
    const ref = this.db.list('trips').push(trip);
    if (ref.key) {
      trip.id = ref.key;
      this.db.list('trips').update(ref.key, trip);
    }
  }

  removeTrip(idx: string): void {
    this.db.list('trips').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.key === idx) {
          this.db.list('trips').remove(i.payload.key);
        }
      }
    });
  }

  changePriceOfTrip(idx: string, price: number): void {
    this.db.list('trips').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.key === idx) {
          console.log(i.payload.key);
          this.db.list('trips').update(i.payload.key, { price: price });
        }
      }
    });
  }

  changeNameOfTrip(idx: string, name: string) {
    this.db.list('trips').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.key === idx) {
          console.log(i.payload.key);
          this.db.list('trips').update(i.payload.key, { name: name });
        }
      }
    });
  }

  changeDescOfTrip(idx: string, desc: string) {
    this.db.list('trips').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.key.id === idx) {
          console.log(i.payload.key);
          this.db.list('trips').update(i.payload.key, { shortDesc: desc });
        }
      }
    });
  }

  getNextId() {
    return this.nextId;
  }

  addNewUser(user: User) {
    this.db.object('/users/' + user.uid).set({
      email: user.email,
      roles: user.roles,
    });
  }

  async getUserRoles(uid: string) {
    return firstValueFrom(
      this.db.object('/users/' + uid + '/roles').valueChanges()
    );
  }

  getUserRoles$(uid: string) {
    return this.db.object('/users/' + uid + '/roles').valueChanges();
  }

  getUsers() {
    return this.db.list('users').snapshotChanges();
  }

  changeUserRole(uid: string, role: string, value: string) {
    let change = '{"' + role + '"' + ':' + value + '}';
    this.db.object('/users/' + uid + '/roles').update(JSON.parse(change));
  }

  getOrderHistory$(uid:string){
    return this.db.object('/orderHistory/' + uid).valueChanges();
  }

  pushOrder(items: string[], uid:string){
    try{
      this.db.list('/orderHistory/' + uid).push({items: items, date: new Date().toLocaleDateString()})
    }
    catch (err){
      window.alert(err)
    }
  }

  updateTrip(data: any, idS:string){
    this.db.list('trips').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.val().id == idS) {
          this.db.list('trips').update(i.payload.key, data)
        }
      }
    });
  }
}
