import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { ShopRoutingModule } from './shop-routing.module';

import { ShopsComponent } from './components/shops/shops.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { ShopComponent } from './shop.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { СustomersComponent } from './components/customers/customers.component';

@NgModule({
  declarations: [
    ShopsComponent,
    ShopItemComponent,
    ShopComponent,
    DashboardComponent,
    ProductsComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductFormComponent,
    OrdersComponent,
    OrderCreateComponent,
    OrderFormComponent,
    СustomersComponent
  ],
  imports: [
    BrowserModule,
    ShopRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule
  ],
  providers: []
})
export class ShopModule { }
