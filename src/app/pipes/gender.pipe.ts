import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'gender'
})
export class GenderPipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case null:
                return 'keine Angabe';
            case 0:
                return 'weiblich';
            case 1:
                return 'männlich';
            case 2:
                return 'divers';
        }
    }
}
