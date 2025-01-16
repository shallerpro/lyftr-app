import {Routes} from '@angular/router';
import {HomePage} from "./home/home.page";
import {MainPage} from "./main.page";
import {PostPage} from "./post/post.page";
import {ShortcodePage} from "./shortcode/shortcode.page";
import {DomainPage} from "./domain/domain.page";

export const mainRoutes: Routes = [{
    path: '',
    component: MainPage,
    children: [
        {
            path: 'home',
            component: HomePage,

        },
        {
            path: 'post',
            component: PostPage,
        },
        {
            path: 'post/:id',
            component: PostPage,
        },
        {
            path: 'shortcode',
            component: ShortcodePage,
        },
        {
            path: 'domain',
            component: DomainPage
        },
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        }
    ]

}];
