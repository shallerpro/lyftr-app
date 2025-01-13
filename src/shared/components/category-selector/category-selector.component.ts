import {Component, inject, Input, OnInit} from '@angular/core';
import {CategorieModel} from "../../models/categorie.model";
import {UserService} from "../../services/user.service";
import {HostService} from "../../services/host.service";

import {IonChip, IonRow} from '@ionic/angular/standalone';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-category-selector',
    templateUrl: './category-selector.component.html',
    styleUrls: ['./category-selector.component.scss'],
    standalone: true,
  imports: [ReactiveFormsModule, IonRow, IonChip]
})
export class CategorySelectorComponent implements OnInit {

    @Input() horizontalScroll: string = "";
    public categories: CategorieModel[] = [];
    private userService: UserService = inject(UserService);
    private hostService: HostService = inject(HostService);

    constructor() {
        this.userService.obsCurrentHost().subscribe(async (host) => {
            this.categories = await this.hostService.getCategoriesByHost(host);
        });
    }

    async ngOnInit() {


    }

    doSelectCategory(category: CategorieModel) {
        category.raw.selected = !category.raw.selected;
    }


}
