import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SaveInputGuard implements CanDeactivate<OnLeaveInput> {
    canDeactivate(component: OnLeaveInput) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}

export interface OnLeaveInput {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
