import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router,
    private authService: AuthenticationService,) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if(this.router.url == "/login") {
      this.router.navigate(['/login']);
      console.log("tr")

      return true;
    } else {
      this.router.navigate(['/login']);
      console.log()
      return false;
    }
  }
  
}
