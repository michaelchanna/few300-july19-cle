import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { NavComponent } from './components/nav/nav.component';
import { MathModule } from './features/math/math.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
// import { AdminModule } from './features/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FourOhFourComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    MathModule,
    // AdminModule
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    HttpClientModule,
    AppRoutingModule // after any feature modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
