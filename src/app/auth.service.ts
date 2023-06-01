import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartInfoService } from './cart-info.service';
import { FireBaseService } from './firebase.service';
import { Roles, User } from './user.interface';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userData: any = null;
  userRoles: Roles = {
    guest: true,
    admin: false,
    manager: false,
    client: false,
    banned: false,
  };
  
  persistenceSetting: string = 'local';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private fb: FireBaseService,
    private cart: CartInfoService
  ) {
    afAuth.authState.subscribe(async (user: any) => {
      if (user) {
        this.userData = user;
        const roles = await this.fb.getUserRoles(user?.uid);
        this.userRoles = roles as Roles;
      } else {
        this.userData = null;
        this.userRoles = {
          guest: true,
          admin: false,
          manager: false,
          client: false,
          banned: false,
        };
      }
    });
  }

  public signInEmailPass(email: string, password: string): Promise<void> {
    return this.afAuth.setPersistence(this.persistenceSetting).then(() => {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.router.navigate(['panel']);
        })
        .catch((err: any) => {
          window.alert(err.message);
        });
    });
  }

  public registerEmailPass(email: string, password: string): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        const userData = new User(res.user);
        this.fb.addNewUser(userData);
        this.router.navigate(['panel']);
      })
      .catch((err: any) => {
        window.alert(err.message);
      });
  }

  getCurrentUserData() {
    return this.afAuth.currentUser;
  }

  getAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.cart.cart = [];
      this.router.navigate(['']);
    });
  }

  public isLoggedIn(): boolean {
    return this.userData !== null;
  }

  public changePersistence(newSetting: string): void {
    this.persistenceSetting = newSetting;
  }
}
