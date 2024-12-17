import {inject, Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query, setDoc, updateDoc,
  where
} from "@angular/fire/firestore";
import {HostModel} from "../models/host.model";
import {SettingsService} from "./settings.service";
import {PostModel} from "../models/post.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private firestore: Firestore = inject(Firestore);
  private settings : SettingsService = inject(SettingsService);


  constructor() { }


  getPostObservable ( host : HostModel ) : Observable<any[]> {

    const postRef = collection(this.firestore, this.settings.POST_COLLECTION);
    const postQuery = query ( postRef , where('hostRef', '==',
        doc ( this.firestore , this.settings.HOST_COLLECTION , host.id ) ));

    return collectionData ( postQuery );
  }


  async getPostById ( id : string ) {
    let postRef : any = doc(this.firestore, this.settings.POST_COLLECTION , id );

    if ( postRef ) {
      let snapshot = await getDoc( postRef );
      let post : PostModel = new PostModel( snapshot.data() , snapshot.id );

      post.catRefs = [];

      if ( post.raw.catRefs )
      for ( let cat of post.raw.catRefs )
        post.catRefs.push( doc ( this.firestore , this.settings.HOST_COLLECTION, cat.id  ));



      return post;
    }

    return null ;
  }

  async getPostsByHost ( host : HostModel ) {

    const postRef = collection(this.firestore, this.settings.POST_COLLECTION);
    const postQuery = query ( postRef , where('hostRef', '==',
         doc ( this.firestore , this.settings.HOST_COLLECTION , host.id ) ));

    const docs = await getDocs(postQuery);
    const posts : PostModel[] = [];

    docs.docs.map( doc => {
      posts.push ( new PostModel( doc.data()  , doc.id ));
    }) ;

    return posts;


  }

  async addPost ( host : HostModel , post : PostModel ) {
    const postRef = collection(this.firestore, this.settings.POST_COLLECTION);
    let ret : any = await addDoc ( postRef , post.toJSON(['id']));
    return ret ;
  }


  async editPost (  post : PostModel ) {
    try {
      const postRef: any = doc(this.firestore, this.settings.POST_COLLECTION, post.id);
      let ret: any = await setDoc(postRef, post.toJSON(['id', 'organizationRef', 'hostRef']) , { merge : true });
      return ret;
    } catch (e) {
      console.error("editPost" , e);
    }
  }


}
