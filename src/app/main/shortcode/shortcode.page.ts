import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonContent} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../../shared/components/header/header.component";

@Component({
    selector: 'app-shortcode',
    templateUrl: './shortcode.page.html',
    styleUrls: ['./shortcode.page.scss'],
    standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class ShortcodePage implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
