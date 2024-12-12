import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'signin',
    loadComponent: () => import('./auth/signin/signin.page').then((m) => m.SigninPage),
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
];
