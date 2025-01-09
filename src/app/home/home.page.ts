import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonCol,
  IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {add} from "ionicons/icons";
import {PostService} from "../../shared/services/post.service";
import {UserService} from "../../shared/services/user.service";
import {PostModel} from "../../shared/models/post.model";
import {Observable} from "rxjs";
import {CategorySelectorComponent} from "../../shared/components/category-selector/category-selector.component";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonCol, IonImg, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonLabel, CommonModule, CategorySelectorComponent],
})
export class HomePage implements OnInit {

  private postService : PostService = inject(PostService);
  private userService : UserService = inject(UserService);
  private router : Router = inject(Router);
  private refresh$ : Observable<any> | null = null;
  public currentHostName = '';

  public items : PostModel[] = [];

  constructor() {
    addIcons({add});

  }
  async ngOnInit() {

    let host : any = this.userService.currentHost;
    if ( host ) {
      let items: any = await this.postService.getPostsByHost(host);
      this.currentHostName = host.url;

      this.refresh$ = this.postService.getPostObservable( host );

      if ( this.refresh$.subscribe( async () => {
        console.log("refresh" );

        this.items =  await this.postService.getPostsByHost(host);
      } ))

      if ( items )
        this.items = items
    }

  }

  doLogout() {
    this.userService.logout();
  }

  async doAdd() {
    this.router.navigate(['/addPost'])

  }

  async doEdit( postId : string ) {
    this.router.navigate(['/addPost' , { id : postId }]);
  }



}
