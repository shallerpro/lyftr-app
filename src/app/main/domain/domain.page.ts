import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonContent} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../../shared/components/header/header.component";

@Component({
    selector: 'app-domain',
    templateUrl: './domain.page.html',
    styleUrls: ['./domain.page.scss'],
    standalone: true,
    imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class DomainPage implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
