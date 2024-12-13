import {inject, Injectable} from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {UserModel} from "../models/user.model";
import {collection, doc, Firestore, getDoc} from "@angular/fire/firestore";
import {HostService} from "./host.service";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private host : HostService = inject(HostService);
  public currentUser : UserModel | null = null

  constructor() {


  }

  async signInByEmail( email : string , password : string ) {


    try {
      const userCredential : any  = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(userCredential);
      if ( userCredential ) {

        const userRef : any = doc(this.firestore, 'users' , userCredential.user.uid );
        const userDoc : any  = await getDoc ( userRef );
        if (  userDoc  ) {
          this.currentUser = new UserModel( userDoc.data() , userDoc.id );
          this.currentUser.organizationRef = this.currentUser.raw.organizationRef;
          console.log(this.currentUser);

          this.host.getHostByUser(  this.currentUser );


        }



        return true;

      }

    } catch (e) {
      console.error ( "Error while signing in", e );
    }
    return false ;
  }


  async logout() {
    this.auth.signOut();

  }


}
