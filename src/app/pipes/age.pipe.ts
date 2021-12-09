import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'age'
})
export class AgePipe implements PipeTransform {
    transform(value: number): string {
        if (value === 0) {
            return 'unter 12';
        } else if (value > 0 && value < 15) {
            return (value + 11).toString();
        } else if (value === 15) {
            return 'über 25';
        } else {
            return 'unbekannt';
        }
    }
}
