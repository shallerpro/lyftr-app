import {inject, Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import {collection, collectionData, doc, Firestore, getDoc, getDocs, query, where} from "@angular/fire/firestore";
import {HostModel} from "../models/host.model";
import {SettingsService} from "./settings.service";
import {CategorieModel} from "../models/categorie.model";

@Injectable({
  providedIn: 'root'
})
export class HostService {

  private firestore: Firestore = inject(Firestore);
  private settings : SettingsService = inject(SettingsService);

  constructor() { }


  async getHostById ( id : string ) {
    const ref : any = doc(this.firestore, this.settings.HOST_COLLECTION , id );
    if ( !ref ) {
      let snapshot = await getDoc( ref );
      return new HostModel( snapshot.data() , snapshot.id );
    }
    return false ;
  }

  async getHostsByUser ( user : UserModel ) {

    const hostRef = collection(this.firestore, "hosts");
    const hostQuery = query ( hostRef , where('organizationRef', '==', user.organizationRef));

    const docs = await getDocs(hostQuery);
    const hosts : HostModel[] = [];

    docs.docs.map( doc => {
      hosts.push ( new HostModel( doc.data()  , doc.id ));
    }) ;

    return hosts;

  }

  async getCategoriesByHost  ( currentHost : HostModel  ){

    const categoryRef = collection(this.firestore, this.settings.CATEGORY_COLLECTION );
    const categoryQuery = query ( categoryRef , where('hostRef', '==',
        doc ( this.firestore , this.settings.HOST_COLLECTION , currentHost.id ) ));

    const docs = await getDocs(categoryQuery);
    const categories : CategorieModel[] = [];

    docs.docs.map( doc => {
      categories.push ( new CategorieModel( doc.data()  , doc.id ));
    }) ;

    return categories;
  }
}
