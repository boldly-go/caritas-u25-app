import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'date',
    pure: false // required to update the value when the promise is resolved
})
export class MockedDatePipe implements PipeTransform {
    name = 'date';

    transform(query: string, ...args: any[]): any {
        return query;
    }
}
