import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace('zoom=1', 'zoom=2')
      .replace('&edge=curl', '');
  }

}
