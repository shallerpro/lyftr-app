import { CanActivateFn } from '@angular/router';
import {UserService} from "../services/user.service";
import {inject} from "@angular/core";

export const mainGuard: CanActivateFn = (route, state) => {
  let userService : UserService = inject ( UserService);
  return userService.isConnected() ;
};
