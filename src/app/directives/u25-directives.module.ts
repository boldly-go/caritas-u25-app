import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurePasswordDirective } from './secure-password.directive';
import { EqualValueDirective } from './equal-value.directive';

@NgModule({
    declarations: [SecurePasswordDirective, EqualValueDirective],
    exports: [SecurePasswordDirective, EqualValueDirective],
    imports: [CommonModule]
})
export class U25DirectivesModule {}
