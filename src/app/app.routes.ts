import { Routes } from '@angular/router';
import {canActivate} from "@angular/fire/auth-guard";
import {mainGuard} from "../shared/guards/main.guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate : [ mainGuard ]
  },
  {
    path: 'signIn',
    loadComponent: () => import('./auth/signin/sign-in.page').then((m) => m.SignInPage),
  },
  {
    path: 'addPost',
    loadComponent: () => import('./change-post/change-post.page').then((m) => m.ChangePostPage),
    canActivate : [ mainGuard ]
  },
  {
    path: 'addPost/:id',
    loadComponent: () => import('./change-post/change-post.page').then((m) => m.ChangePostPage),
    canActivate : [ mainGuard ]
  },
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
];
