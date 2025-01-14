import {Component, inject, OnInit} from '@angular/core';
import {SidebarService} from "../../shared/services/sidebar.service";
import {IonContent, IonLabel, IonRouterOutlet} from "@ionic/angular/standalone";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../shared/services/user.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
    standalone: true,
    imports: [
        IonRouterOutlet,
        IonContent,
        RouterLink,
        IonLabel
    ]
})
export class MainPage implements OnInit {
    public isOpen: boolean = false;

    private readonly sidebarService: SidebarService = inject(SidebarService);
    private readonly userService: UserService = inject(UserService);
    private readonly router: Router = inject(Router);

    constructor() {
        this.sidebarService.observeIsOpen().subscribe(isOpen => {
            this.isOpen = isOpen;
        });
    }

    ngOnInit() {
    }

    async logout() {
        await this.userService.logout();

    }

    reload() {
        location.reload();
    }
}
