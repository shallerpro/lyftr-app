import {inject, Injectable} from '@angular/core';
import {Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword,} from '@angular/fire/auth';
import {UserModel} from "../models/user.model";
import {doc, Firestore, getDoc} from "@angular/fire/firestore";
import {HostService} from "./host.service";
import {HostModel} from "../models/host.model";
import {DocumentReference} from "@angular/fire/compat/firestore";
import {SettingsService} from "./settings.service";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    public currentUser: UserModel | null = null;
    public currentHost: HostModel | null = null;
    public currentHostRef: DocumentReference | null = null;
    private auth: Auth = inject(Auth);
    private firestore: Firestore = inject(Firestore);
    private host: HostService = inject(HostService);
    private settings: SettingsService = inject(SettingsService);

    constructor() {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await this.setCurrentUser(user.uid);
            } else {
                await this.logout();
            }
        });
    }

    isConnected(): boolean {
        return (this.currentUser != null);

    }

    async changeCurrentHost(host: HostModel) {

        this.currentHost = host;
        this.currentHostRef =
            this.settings.getDocRef(this.settings.HOST_COLLECTION, host.id);

    }

    async setCurrentUser(uid: string) {
        const userRef: any = doc(this.firestore, 'users', uid);
        const userDoc: any = await getDoc(userRef);
        if (userDoc) {
            this.currentUser = new UserModel(userDoc.data(), userDoc.id);
            this.currentUser.organizationRef = this.currentUser.raw.organizationRef;
            console.log(this.currentUser);

            let hosts: any = await this.host.getHostsByUser(this.currentUser);

            if (hosts)
                await this.changeCurrentHost(hosts[0]);
        }
    }

    async signInByEmail(email: string, password: string) {

        try {
            await signInWithEmailAndPassword(this.auth, email, password);
        } catch (e) {
            console.error("Error while signing in", e);
        }
        return false;
    }


    async logout() {
        this.currentUser = null;
        this.auth.signOut();

    }


}
