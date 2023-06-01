import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FireBaseService } from '../firebase.service';
import { Roles, User } from '../user.interface';

@Component({
  selector: 'app-adminPanel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  constructor(public auth: AuthService, private fb: FireBaseService) {}

  selectedPersistence = this.auth.persistenceSetting;
  selectedRoleToAdd: any;
  selectedRoleToDismiss: any;

  users: User[] = [];
  usersSub: Subscription | undefined;

  ngOnInit(): void {
    window.scrollTo(0, 0)
    console.log(this.auth?.userData);
    this.usersSub = this.fb.getUsers().subscribe((users) => {
      this.users = [];
      for (let user of users) {
        let userToAdd = new User(user.payload.val());
        userToAdd.uid = user.payload.key || 'undefined';
        this.users.push(userToAdd);
      }
    });
  }

  ngOnDestroy(): void {
    this.usersSub?.unsubscribe();
  }

  chosenPersistence(): void {
    console.log(this.selectedPersistence);
    this.auth.changePersistence(this.selectedPersistence);
  }

  banUser(uid: string): void {
    this.fb.changeUserRole(uid, 'banned', 'true');
  }
  
  setRole(uid: string, role: string, value: boolean): void {
    this.fb.changeUserRole(uid, role, String(value));
  }

  getUserRoles(uid: string): Roles | null {
    let searchedUser = this.findUserByUid(uid);
    if (searchedUser != null) return searchedUser.roles;
    return null;
  }

  findUserByUid(uid: string): User | null {
    for (let user of this.users) {
      if (user.uid == uid) return user;
    }
    return null;
  }
  
  isAdmin(): boolean {
    return this.auth.userRoles.admin === true;
  }
}
