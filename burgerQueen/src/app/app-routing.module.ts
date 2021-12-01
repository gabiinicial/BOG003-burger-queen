import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstViewComponent } from './pages/first-view/first-view.component';
import { WaiterViewComponent } from './pages/waiter-view/waiter-view.component';
import { WaiterInProcessComponent } from './components/waiter-in-process/waiter-in-process.component';
import { WaiterHistoryComponent } from './components/waiter-history/waiter-history.component';
import { ViewChefOrderComponent } from './components/view-chef-order/view-chef-order.component';
import { HistoryOrderChefComponent } from './components/history-order-chef/history-order-chef.component';

const routes: Routes = [

  { path: '', component: FirstViewComponent },
  { path: 'waiter-view', component: WaiterViewComponent },
  { path: 'in-process', component: WaiterInProcessComponent },
  { path: 'history', component: WaiterHistoryComponent },
  { path: 'view-chef-order', component: ViewChefOrderComponent },
  { path: 'history-order-chef', component: HistoryOrderChefComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
