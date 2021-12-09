import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgePipe } from './age.pipe';
import { StatePipe } from './state.pipe';
import { GenderPipe } from './gender.pipe';

@NgModule({
    declarations: [AgePipe, StatePipe, GenderPipe],
    imports: [CommonModule],
    exports: [AgePipe, StatePipe, GenderPipe]
})
export class U25PipesModule {}
