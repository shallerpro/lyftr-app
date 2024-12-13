import { Component  } from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {add} from "ionicons/icons";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab , IonFabButton , IonIcon , IonList , IonItem , IonLabel , CommonModule],
})
export class HomePage {

  public items  = ['Blabla','blabla','blibli','blublu'];

  constructor() {
    addIcons({ add });
  }
}
