import {Routes} from '@angular/router';
import {HomePage} from "./home/home.page";
import {MainPage} from "./main.page";
import {ChangePostPage} from "./change-post/change-post.page";

export const mainRoutes: Routes = [{
    path: '',
    component: MainPage,
    children: [
        {
            path: 'home',
            component: HomePage,

        },
        {
            path: 'addPost',
            component: ChangePostPage,
        },
        {
            path: 'addPost/:id',
            component: ChangePostPage,
        },
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        }
    ]

}];
