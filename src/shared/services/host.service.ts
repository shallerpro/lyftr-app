import {inject, Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import {collection, collectionData, doc, Firestore, getDoc, getDocs, query, where} from "@angular/fire/firestore";
import {HostModel} from "../models/host.model";
import {SettingsService} from "./settings.service";

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

  async getHostByUser ( user : UserModel ) {

    const hostRef = collection(this.firestore, "hosts");
    const hostQuery = query ( hostRef , where('organizationRef', '==', user.organizationRef));

    const docs = await getDocs(hostQuery);
    const hosts : HostModel[] = [];

    docs.docs.map( doc => {
      hosts.push ( new HostModel( doc.data()  , doc.id ));
    }) ;

    console.log(hosts);



  }
}
