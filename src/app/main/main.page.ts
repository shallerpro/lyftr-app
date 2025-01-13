import {Component, inject, OnInit} from '@angular/core';
import {SidebarService} from "../../shared/services/sidebar.service";
import {IonContent, IonRouterOutlet} from "@ionic/angular/standalone";

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
    standalone: true,
    imports: [
        IonRouterOutlet,
        IonContent
    ]
})
export class MainPage implements OnInit {
    public isOpen: boolean = false;
    private readonly sidebarService: SidebarService = inject(SidebarService);

    constructor() {
        this.sidebarService.observeIsOpen().subscribe(isOpen => {
            this.isOpen = isOpen;
        });
    }

    ngOnInit() {
    }

}
