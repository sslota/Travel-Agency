import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CartComponent } from './cart/cart.component';
import { PanelComponent } from './panel/panel.component';
import { TripAddComponent } from './trip-add/trip-add.component';
import { TripsComponent } from './trips/trips.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { TripDetailsGuard } from './guard/trip-details.guard';
import { LoginTwiceGuard } from './guard/login-twice.guard';
import { ManagerGuard } from './guard/manager.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagerPanelComponent } from './manager-panel/manager-panel.component';
import { ModifyTripComponent } from './modify-trip/modify-trip.component';
import { PagenotfoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { SingletripComponent } from './single-trip/singlet-rip.component';

const routes: Routes = [
  { path: 'trips', component: TripsComponent },
  {
    path: 'trips/:id',
    component: SingletripComponent,
    canActivate: [TripDetailsGuard],
  },
  { path: 'addnewtrip', component: TripAddComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginTwiceGuard] },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manager',
    component: ManagerPanelComponent,
    canActivate: [ManagerGuard],
  },
  {
    path: 'manager/modify/:id',
    component: ModifyTripComponent,
    canActivate: [AuthGuard, ManagerGuard],
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AdminGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
