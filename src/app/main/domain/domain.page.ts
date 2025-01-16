import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';

@Component({
    selector: 'app-domain',
    templateUrl: './domain.page.html',
    styleUrls: ['./domain.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DomainPage implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
