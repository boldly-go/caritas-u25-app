import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'emoji',
    pure: false // required to update the value when the promise is resolved
})
export class MockedEmojiPipe implements PipeTransform {
    name = 'emoji';

    transform(query: string, ...args: any[]): any {
        return query;
    }
}
