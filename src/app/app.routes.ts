import {Routes} from '@angular/router';
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/signIn']);

export const routes: Routes = [


    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./main/main.routes').then(m => m.mainRoutes),
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    }

];
