import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { IsSignedInGuard } from '../../guards/is-signed-in/is-signed-in.guard';
import { StaticComponent } from './static.component';

const routes: Routes = [
  {
    path: '',
    component: StaticComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'sign-in', component: SignInComponent, canActivate: [IsSignedInGuard] },
      { path: 'sign-up', component: SignUpComponent, canActivate: [IsSignedInGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
