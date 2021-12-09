import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LockService } from '../services/lock.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PinGuard implements CanActivate {
    constructor(private router: Router, private lockService: LockService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.lockService.isUnlocked) {
            return true;
        } else if (!environment.pinAuth) {
            this.lockService.unlockApp('123456');
            return true;
        } else {
            this.lockService.redirectUrl = state.url;
            this.router.navigateByUrl('/welcome');
            return this.lockService.isUnlocked;
        }
    }
}
