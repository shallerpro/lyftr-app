import {Component, inject, OnInit} from '@angular/core';
import {SidebarService} from "../../shared/services/sidebar.service";
import {IonContent, IonIcon, IonItem, IonLabel, IonRouterOutlet} from "@ionic/angular/standalone";
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {ActiveRootPipe} from "../../shared/pipes/active-root.pipe";
import {addIcons} from "ionicons";
import {menuOutline} from "ionicons/icons";

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
    standalone: true,
    imports: [
        IonRouterOutlet,
        IonContent,
        RouterLink,
        IonLabel,
        ActiveRootPipe,
        IonIcon,
        IonItem
    ]
})
export class MainPage implements OnInit {
    public isOpen: boolean = false;
    public url: string = "";
    public isMobile: boolean = false;
    protected readonly close = close;
    private readonly sidebarService: SidebarService = inject(SidebarService);
    private readonly userService: UserService = inject(UserService);
    private readonly router: Router = inject(Router);
    private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

    constructor() {
        addIcons({
            menuOutline
        });

        this.sidebarService.observeIsOpen().subscribe(isOpen => {
            this.isOpen = isOpen;
        });
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd)
                this.url = val.url;
        });
    }

    ngOnInit() {
    }

    async logout() {
        await this.userService.logout();

    }

    closeSideBar() {
        this.sidebarService.closeSidebar();
    }
}
