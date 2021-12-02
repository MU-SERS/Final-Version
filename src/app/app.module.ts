import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketsComponent } from './tickets/tickets.component';
import { MapComponent } from './map/map.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportsComponent } from './reports/reports.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { IsReadService } from './is-read.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    MapComponent,
    ReportsComponent,
    UserMenuComponent,
  
    [AppComponent]
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    
    RouterModule.forRoot(
      [
        { path: 'tickets', component: TicketsComponent },
        { path: 'map', component: MapComponent },
        { path: 'map/:location', component: MapComponent },
        { path: 'reports', component: ReportsComponent }
      ]
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AngularFirestore,
    IsReadService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
