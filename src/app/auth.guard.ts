import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SellerService} from '../app/services/seller.service'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})


export class authGuard implements CanActivate{
  constructor(private s:SellerService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(localStorage.getItem("seller")){
     return true
    }

   return this.s.isLoggedIn;
  }
}


// export const authGuard: CanActivateFn = (route, state) => {

//   return true;

// };
