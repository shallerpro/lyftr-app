import {Component, inject, Input, OnInit} from '@angular/core';
import {CategorieModel} from "../../models/categorie.model";
import {UserService} from "../../services/user.service";
import {HostService} from "../../services/host.service";

import {
  IonButton, IonButtons, IonCheckbox, IonChip, IonCol,
  IonContent,
  IonHeader, IonIcon, IonImg, IonInput,
  IonRow, IonTextarea, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import {ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ReactiveFormsModule, IonIcon,
    IonInput, IonCheckbox, IonRow, IonImg, IonChip, IonTextarea, IonCol, IonButtons, NgClass]
})
export class CategorySelectorComponent  implements OnInit {

  @Input() horizontalScroll : string = "";
  public categories : CategorieModel[] = [];
  private userService : UserService = inject(UserService);
  private hostService : HostService = inject(HostService);

  constructor() { }

  async  ngOnInit() {

    if ( this.userService.currentHost)
      this.categories = await this.hostService.getCategoriesByHost( this.userService.currentHost );

  }

  doSelectCategory ( category : CategorieModel ) {
    category.raw.selected = !category.raw.selected;
  }




}
