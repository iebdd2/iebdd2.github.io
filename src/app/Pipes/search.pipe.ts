import { Pipe, PipeTransform } from '@angular/core';
import { SearchService } from '../Services/search.service';

@Pipe({
  name: 'Search'
})
export class SearchPipe implements PipeTransform {

  constructor(private SearchService: SearchService) {}

  transform(term: string, lang: number): Array<number> {
    return this.SearchService.filterSearch(term, lang, false);
  }

}
