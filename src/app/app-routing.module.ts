import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderDetailComponent } from './components/purchase-order-detail/purchase-order-detail.component';
import { PurchaseOrderFormComponent } from './components/purchase-order-form/purchase-order-form.component';

const routes: Routes = [
  { path: 'orders', component: PurchaseOrderListComponent },
  { path: 'orders/create', component: PurchaseOrderFormComponent },
  { path: 'orders/:id/edit', component: PurchaseOrderFormComponent }, 
  { path: 'orders/:id', component: PurchaseOrderDetailComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

