import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    public isOpen: Subject<boolean> = new Subject<boolean>();

    constructor() {
    }

    public openSidebar() {
        this.isOpen.next(true);
    }

    public closeSidebar() {
        this.isOpen.next(false);
    }

    public observeIsOpen() {
        return this.isOpen.asObservable();
    }
}
