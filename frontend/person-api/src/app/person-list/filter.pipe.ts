import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!searchTerm) return items;
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(searchTerm));
  }
}
