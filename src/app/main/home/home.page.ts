import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {
    IonButton,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {add, reorderThreeOutline} from "ionicons/icons";
import {PostService} from "../../../shared/services/post.service";
import {UserService} from "../../../shared/services/user.service";
import {PostModel} from "../../../shared/models/post.model";
import {Observable} from "rxjs";
import {CategorySelectorComponent} from "../../../shared/components/category-selector/category-selector.component";
import {HostModel} from "../../../shared/models/host.model";
import {StripHtmlPipe} from "../../../shared/pipes/strip-html.pipe";
import {SidebarService} from "../../../shared/services/sidebar.service";


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonContent, IonList, IonItem, CategorySelectorComponent, IonHeader, IonToolbar, IonTitle, IonButton, StripHtmlPipe, IonFab, IonFabButton, IonIcon, IonThumbnail],
})
export class HomePage implements OnInit {

    public currentHostName = '';
    public items: PostModel[] = [];
    private readonly postService: PostService = inject(PostService);
    private readonly userService: UserService = inject(UserService);
    private readonly sidebar: SidebarService = inject(SidebarService);
    private readonly router: Router = inject(Router);
    private refresh$: Observable<any> | null = null;
    private isSidebarOpen: boolean = false;

    constructor() {
        addIcons({add, reorderThreeOutline});

        this.userService.obsCurrentHost().subscribe(async (host) => {
            if (host)
                await this.init(host);
        });
        this.sidebar.observeIsOpen().subscribe((isOpen) => {
            this.isSidebarOpen = isOpen;
        });

    }

    async init(host: HostModel) {

        let items: any = await this.postService.getPostsByHost(host);
        this.currentHostName = host.url;

        this.refresh$ = this.postService.getPostObservable(host);

        if (this.refresh$.subscribe(async () => {
            console.log("refresh");

            this.items = await this.postService.getPostsByHost(host);
        }))

            if (items)
                this.items = items

    }

    async ngOnInit() {


    }

    async doLogout() {
        await this.userService.logout();
    }

    async doAdd() {
        await this.router.navigate(['/post'])

    }

    async doEdit(postId: string) {
        await this.router.navigate(['/post', {id: postId}]);
    }

    async switchSidebar() {
        if (this.isSidebarOpen)
            this.sidebar.closeSidebar();
        else
            this.sidebar.openSidebar();
    }


}
