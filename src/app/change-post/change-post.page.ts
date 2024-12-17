import {Component, inject, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  IonButton, IonButtons,
  IonCheckbox, IonChip, IonCol,
  IonContent,
  IonHeader, IonIcon, IonImg,
  IonInput,
  IonRow, IonTextarea,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {CategorieModel} from "../../shared/models/categorie.model";
import {addIcons} from "ionicons";
import {arrowBackOutline} from "ionicons/icons";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {HostService} from "../../shared/services/host.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {StorageService} from "../../shared/services/storage.service";
import {PostModel} from "../../shared/models/post.model";
import {doc, Firestore} from "@angular/fire/firestore";
import {PostService} from "../../shared/services/post.service";
import {SettingsService} from "../../shared/services/settings.service";

@Component({
  selector: 'app-change-post',
  templateUrl: './change-post.page.html',
  styleUrls: ['./change-post.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ReactiveFormsModule, IonIcon,
    IonInput, IonCheckbox, IonRow, IonImg, IonChip , IonTextarea , IonCol , IonButtons]
})
export class ChangePostPage implements OnInit {

  public postForm = new FormGroup({
    aiPattern: new FormControl(''),
    title : new FormControl(''),
    content: new FormControl(''),
    isAi : new FormControl( true ),
  });

  public categories : CategorieModel[] = [];
  public currentId : string = "" ;
  public currentImageUrl : string ="" ;
  private firestore: Firestore = inject(Firestore);
  private settings : SettingsService = inject( SettingsService );
  private router : Router = inject(Router);
  private route = inject(ActivatedRoute);
  private location : Location = inject(Location);
  private storageService : StorageService = inject(StorageService);
  private userService : UserService = inject(UserService);
  private hostService : HostService = inject(HostService);
  private postService : PostService = inject(PostService);

  constructor( )  {
    addIcons({ arrowBackOutline })
  }

  doBack(){
    this.location.back();
  }

  doSelectCategory ( category : CategorieModel ) {
    category.raw.selected = !category.raw.selected;
  }


  isAiCheck () {
    const check: boolean | null | undefined = this.postForm.value.isAi ;
    return check != undefined ? check : false ;

  }

  doSwitchAiManuel () {

    if ( this.isAiCheck() ) {
      this.postForm.patchValue( { isAi:  !this.isAiCheck()  }) ;
    }

  }

  async ngOnInit() {

    if ( this.userService.currentHost)
      this.categories = await this.hostService.getCategoriesByHost( this.userService.currentHost );



   this.currentId = this.route.snapshot.params['id'];


   if ( this.currentId  ) {

     let post : PostModel |  null = await this.postService.getPostById ( this.currentId  );

     if ( post ) {

       this.currentImageUrl = post.imageUrl;
       this.postForm.patchValue(
           {
             title: post.title,
             content: post.content,
             isAi:  false
           }
       )


       if ( post.catRefs ) {

         for (let category of this.categories) {

           for (let selectedCategory of post.catRefs) {

             console.log(selectedCategory, category);

             if (category.id == selectedCategory.id) category.raw.selected = true;
           }

         }
       }

     }


   }



  }

  async doAddPost() {

    try {
      let post: PostModel = new PostModel();

      if (this.isAiCheck()) {
        post.AiPattern = this.postForm.value.aiPattern ? this.postForm.value.aiPattern : "";
      } else {
        post.title = this.postForm.value.title ? this.postForm.value.title : "";
        post.content = this.postForm.value.content ? this.postForm.value.content : "";
      }

      post.catRefs = [];

      for (let category of this.categories) {

        if (category.raw.selected) {
          post.catRefs.push(doc(this.firestore, this.settings.CATEGORY_COLLECTION, category.id));
        }

      }


      if ( this.userService.currentHostRef )
        post.hostRef = this.userService.currentHostRef;

      post.organizationRef = this.userService.currentUser?.organizationRef;
      post.imageUrl = this.currentImageUrl;

      if ( this.currentId != '' ){
        post.id = this.currentId;
        await this.postService.editPost( post );

      } else {

        if (this.userService.currentHost)
          await this.postService.addPost(this.userService.currentHost, post);
      }

      await this.router.navigate(['/home']);
    } catch (e) {

      console.error("doAddPost" , e);
    }
  }

  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        promptLabelHeader : "Sélectionner une photo",
        promptLabelPicture: "Prendre une photo",
        promptLabelPhoto: "Depuis les photos",
        promptLabelCancel: "Annuler"
      });
      if (image && image.dataUrl) {
        this.currentImageUrl = await this.storageService.uploadImage(image.dataUrl, '', );

      }
    } catch (e) {
      console.error('selectImage', e);

    }
  }

}
