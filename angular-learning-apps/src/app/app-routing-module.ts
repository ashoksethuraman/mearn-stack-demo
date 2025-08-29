import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
    // loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration-module').then(m => m.RegistrationModule)
    // canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
