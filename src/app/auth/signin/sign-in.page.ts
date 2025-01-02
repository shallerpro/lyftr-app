import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {Preferences} from "@capacitor/preferences";
import {Router} from "@angular/router";
import {Auth, getAuth, onAuthStateChanged} from "@angular/fire/auth";


@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ReactiveFormsModule, IonInput, IonCheckbox, IonImg],
})
export class SignInPage implements OnInit {

  public signInForm = new FormGroup({
    email: new FormControl('', [ Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  private userService : UserService = inject(UserService);
  private router : Router = inject(Router);
  public rememberMe: boolean = false;


  constructor( ) {
  }



  async ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.userService.setCurrentUser( user.uid );

        await this.router.navigate(['/home']);

      } else {
        await this.userService.logout();
        await this.router.navigate(['/signIn']);
      }
    });



    const email = await Preferences.get({key: 'email'});
    const password = await Preferences.get({key: 'password'});
    if (email.value && email.value !== '' && password.value && password.value !== '') {

      this.signInForm.patchValue({
        email: email.value,
        password: password.value
      });

      this.rememberMe = true;
    }
  }


  async onSignInFormSubmit () {
    try {
      if (this.signInForm.valid) {
        const email: string = this.signInForm.value.email || '';
        const password: string = this.signInForm.value.password || '';

        let ret = await this.userService.signInByEmail(email, password);

        await Preferences.remove({key: 'email'});
        await Preferences.remove({key: 'password'});

        if ( ret ) {

          if ( this.rememberMe ) {
            await Preferences.set({key: 'email', value: email});
            await Preferences.set({key: 'password', value: password});
          }

        }

      }
    } catch (e: any) {

    }
  }

}
