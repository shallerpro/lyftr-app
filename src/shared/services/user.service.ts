import {inject, Injectable} from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth: Auth = inject(Auth);

  constructor() {


  }

  async signInByEmail( email : string , password : string ) {


    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(user);
      if ( user )
        return true ;

    } catch (e) {
      console.error ( "Error while signing in", e );
    }
    return false ;
  }


  async logout() {
    this.auth.signOut();

  }


}
