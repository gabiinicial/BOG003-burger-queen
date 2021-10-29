import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstViewComponent } from './components/first-view/first-view.component';
import { WaiterViewComponent } from './components/waiter-view/waiter-view.component';
import { WaiterInProcessComponent } from './components/waiter-in-process/waiter-in-process.component';
import { WaiterHistoryComponent } from './components/waiter-history/waiter-history.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstViewComponent,
    WaiterViewComponent,
    WaiterInProcessComponent,
    WaiterHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
