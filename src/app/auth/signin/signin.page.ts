import { Component, OnInit } from '@angular/core';
import {IonButton, IonContent, IonHeader, IonInput, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonInput, IonButton, IonContent],
})
export class SigninPage implements OnInit {

  constructor() { }

  ngOnInit() {}

}
