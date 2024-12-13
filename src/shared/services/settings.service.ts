import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public HOST_COLLECTION = 'hosts';
  public USER_COLLECTION = 'users';

  constructor() { }
}
