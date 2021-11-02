import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstViewComponent } from './pages/first-view/first-view.component';
import { WaiterViewComponent } from './components/waiter-view/waiter-view.component';
import { WaiterInProcessComponent } from './components/waiter-in-process/waiter-in-process.component';
import { WaiterHistoryComponent } from './components/waiter-history/waiter-history.component';
const routes: Routes = [

{path: '', component: FirstViewComponent},
{path: 'waiter-view', component:  WaiterViewComponent},
{path: 'in-process', component:  WaiterInProcessComponent},
{path: 'history', component:   WaiterHistoryComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
