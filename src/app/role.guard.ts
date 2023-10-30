import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { DataService } from './service/data.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

 
  constructor(private router:Router, private data:DataService){}
  public role: string ='';
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const email = this.getEmailFromToken();
   return this.data.getUserRole(email)
     .pipe(
      map((role: string) => {
        if (role == 'Admin' && route.data['roles'].includes('Admin')) {
            return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })  
     );
  }

  getEmailFromToken(): string {
   let token = this.data.getToken();
   let decodedtoken: JWTPayload = jwtDecode(token);
    let name = decodedtoken.unique_name;
    console.log(name);
    if (name) {
      return name;
    }
    return 'not found'
  }
}



export interface JWTPayload {
  unique_name: string;
  // Other JWT properties here
}


