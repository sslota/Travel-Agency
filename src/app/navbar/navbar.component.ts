import { Component, OnInit } from '@angular/core';
import { fromEvent, Subscription, tap } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  hamburgerOpened: boolean = false
  pageScrolled: boolean = false
  eventSub: Subscription | undefined
  
  ngOnInit(): void {
    this.eventSub = fromEvent(window, 'scroll').pipe(
      tap(event => this.onWindowScroll(event))
    ).subscribe();
  }

  ngOnDestroy(): void{
    this.eventSub?.unsubscribe();
  }

  onWindowScroll(ev: any): void {
    const element = document.querySelector('.navbar-container') as HTMLElement;
    this.pageScrolled = window.pageYOffset >= element.clientHeight;
  }

  scrollToTop(): void {
    window.scroll(0,0);
  }

  hamburgerHandler(): void {
    this.hamburgerOpened = !this.hamburgerOpened
  }

  optionChosen(): void {
    this.hamburgerOpened = false;
  }

  isAdmin(): boolean {
    return this.auth.userRoles.admin === true;
  }

  isManager(): boolean {
    return this.auth.userRoles.manager === true;
  }
}
