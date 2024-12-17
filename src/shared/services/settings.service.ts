import {inject, Injectable} from '@angular/core';
import {doc, Firestore} from "@angular/fire/firestore";
import {DocumentReference} from "@angular/fire/compat/firestore";
import {DocumentData} from "@firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public HOST_COLLECTION = 'hosts';
  public USER_COLLECTION = 'users';
  public POST_COLLECTION = 'posts';
  public CATEGORY_COLLECTION = 'categories';

  private firestore: Firestore = inject(Firestore);

  constructor() { }

  getDocRef ( collectionName : string , id : string  ) : any
  {
    return doc ( this.firestore , collectionName , id  );
  }
}
