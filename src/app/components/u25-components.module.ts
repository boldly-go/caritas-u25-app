import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSlideComponent } from './info-slide/info-slide.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [InfoSlideComponent],
    imports: [CommonModule, IonicModule],
    exports: [InfoSlideComponent]
})
export class U25ComponentsModule {}
