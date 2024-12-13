import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'signIn',
    loadComponent: () => import('./auth/signin/sign-in.page').then((m) => m.SignInPage),
  },
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
];
