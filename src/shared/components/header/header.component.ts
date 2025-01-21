import {Component, inject, Input, OnInit} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";
import {Router} from "@angular/router";
import {IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {NgIf} from "@angular/common";
import {addIcons} from "ionicons";
import {add, reorderThreeOutline} from "ionicons/icons";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonIcon,
        IonTitle,
        IonButton,
        NgIf,
        IonButtons
    ]
})
export class HeaderComponent implements OnInit {
    @Input() title: string = "";
    @Input() showAdd: boolean = false;
    @Input() showBack: boolean = false;
    @Input() showMenu: boolean = false;

    private isSidebarOpen: boolean = false;
    private readonly sidebar: SidebarService = inject(SidebarService);
    private readonly router: Router = inject(Router);

    constructor() {

        addIcons({add, reorderThreeOutline});
        this.sidebar.observeIsOpen().subscribe((isOpen) => {
            this.isSidebarOpen = isOpen;
        });
    }

    ngOnInit() {
    }

    async switchSidebar() {
        if (this.isSidebarOpen)
            this.sidebar.closeSidebar();
        else
            this.sidebar.openSidebar();
    }

    async doAdd() {
        await this.router.navigate(['/post'])

    }

    async doBack() {
        await this.router.navigate(['/home'])
    }
}
