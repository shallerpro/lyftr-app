import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {IonContent, IonFab, IonFabButton, IonIcon, IonImg, IonItem, IonLabel, IonList} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {add} from "ionicons/icons";
import {PostService} from "../../../shared/services/post.service";
import {UserService} from "../../../shared/services/user.service";
import {PostModel} from "../../../shared/models/post.model";
import {Observable} from "rxjs";
import {CategorySelectorComponent} from "../../../shared/components/category-selector/category-selector.component";
import {HostModel} from "../../../shared/models/host.model";


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonImg, IonContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonLabel, CategorySelectorComponent],
})
export class HomePage implements OnInit {

    public currentHostName = '';
    public items: PostModel[] = [];
    private postService: PostService = inject(PostService);
    private userService: UserService = inject(UserService);
    private router: Router = inject(Router);
    private refresh$: Observable<any> | null = null;

    constructor() {
        addIcons({add});

        this.userService.obsCurrentHost().subscribe(async (host) => {
            await this.init(host);
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
        await this.router.navigate(['/addPost'])

    }

    async doEdit(postId: string) {
        await this.router.navigate(['/addPost', {id: postId}]);
    }


}
