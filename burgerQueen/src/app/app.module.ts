import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstViewComponent } from './pages/first-view/first-view.component';
import { WaiterViewComponent } from './pages/waiter-view/waiter-view.component';
import { WaiterInProcessComponent } from './components/waiter-in-process/waiter-in-process.component';
import { WaiterHistoryComponent } from './components/waiter-history/waiter-history.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MultiplyPricePipe } from './pipes/multiply-price.pipe';
import { CardMenuComponent } from './components/card-menu/card-menu.component';
import { ModalComponent } from './components/modals/modal/modal.component';
import { ModalConfirmationComponent } from './components/modals/modal-confirmation/modal-confirmation.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CardOrderProcessComponent } from './components/card-order-process/card-order-process.component';
import { ViewChefOrderComponent } from './components/view-chef-order/view-chef-order.component';
import { HistoryOrderChefComponent } from './components/history-order-chef/history-order-chef.component';
import { HeaderChefComponent } from './components/header-chef/header-chef.component';

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
    ModalComponent,
    ModalConfirmationComponent,
    CardOrderProcessComponent,
    ViewChefOrderComponent,
    HistoryOrderChefComponent,
    HeaderChefComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
