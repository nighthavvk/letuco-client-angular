import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../../guards/authentication/authentication.guard';

import { ShopsComponent } from './components/shops/shops.component';
import { ShopComponent } from './shop.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { СustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
  {
    path: 'shops',
    component: ShopsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'shops/:id',
    component: ShopComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/create', component: ProductCreateComponent },
      { path: 'products/edit/:id', component: ProductEditComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/create', component: OrderCreateComponent },
      { path: 'customers', component: СustomersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
