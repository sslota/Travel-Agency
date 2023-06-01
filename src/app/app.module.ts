import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TripsComponent } from './trips/trips.component';
import { HomeComponent } from './home/home.component';
import { TripAddComponent } from './trip-add/trip-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { PagenotfoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';
import { SingletripComponent } from './single-trip/singlet-rip.component';
import { ReviewComponent } from './review/review.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { PanelComponent } from './panel/panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ManagerPanelComponent } from './manager-panel/manager-panel.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModifyTripComponent } from './modify-trip/modify-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TripsComponent,
    HomeComponent,
    TripAddComponent,
    TripRatingComponent,
    PagenotfoundComponent,
    CartComponent,
    SingletripComponent,
    ReviewComponent,
    LoginComponent,
    RegisterComponent,
    PanelComponent,
    AdminPanelComponent,
    ManagerPanelComponent,
    FooterComponent,
    ModifyTripComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
