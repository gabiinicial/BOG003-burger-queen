import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstViewComponent } from './pages/first-view/first-view.component';
import { WaiterViewComponent } from './components/waiter-view/waiter-view.component';
import { WaiterInProcessComponent } from './components/waiter-in-process/waiter-in-process.component';
import { WaiterHistoryComponent } from './components/waiter-history/waiter-history.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MultiplyPricePipe } from './pipes/multiply-price.pipe';
import { CardMenuComponent } from './components/card-menu/card-menu.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstViewComponent,
    WaiterViewComponent,
    WaiterInProcessComponent,
    WaiterHistoryComponent,
    HeaderComponent,
    MultiplyPricePipe,
    CardMenuComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
