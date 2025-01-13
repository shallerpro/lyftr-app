import {inject, Injectable} from '@angular/core';
import {Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword,} from '@angular/fire/auth';
import {UserModel} from "../models/user.model";
import {doc, Firestore, getDoc} from "@angular/fire/firestore";
import {HostService} from "./host.service";
import {HostModel} from "../models/host.model";
import {DocumentReference} from "@angular/fire/compat/firestore";
import {SettingsService} from "./settings.service";
import {BehaviorSubject} from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    public currentUser: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
    public currentHost: BehaviorSubject<HostModel | null> = new BehaviorSubject<HostModel | null>(null);
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
        return (this.currentUser.value != null);

    }

    public obsCurrentHost() {
        return this.currentHost;
    }

    public getCurrentHost() {
        return this.currentHost.value;
    }

    public obsCurrentUser() {
        return this.currentUser;
    }

    public getCurrentUser() {
        return this.currentUser.value;
    }


    async changeCurrentHost(host: HostModel) {
        this.currentHost.next(host);
        this.currentHostRef =
            this.settings.getDocRef(this.settings.HOST_COLLECTION, host.id);

    }

    async setCurrentUser(uid: string) {
        const userRef: any = doc(this.firestore, 'users', uid);
        const userDoc: any = await getDoc(userRef);
        if (userDoc) {
            const user = new UserModel(userDoc.data(), userDoc.id);
            user.organizationRef = user.raw.organizationRef;
            console.log(user);
            this.currentUser.next(user);
            let hosts: any = await this.host.getHostsByUser(user);

            if (hosts)
                await this.changeCurrentHost(hosts[0]);
        }
    }

    async signInByEmail(email: string, password: string) {

        try {
            const user = await signInWithEmailAndPassword(this.auth, email, password);
            if (user) {
                return true;
            }
        } catch (e) {
            console.error("Error while signing in", e);
        }
        return false;
    }


    async logout() {
        this.currentUser.next(null);
        await this.auth.signOut();

    }


}
