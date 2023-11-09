import { Injectable } from '@angular/core';
import { LoadDataService } from './load-data.service';
import { Names, Config } from '../recipe';


@Injectable({
  providedIn: 'root'
})

/*               Replacement Service                     */
/* Replaces IDs for recipes and key phrases              */
/* with their corresponding strings for each language    */

export class ReplacementService {

  constructor(private LoadDataService: LoadDataService) { }

  names: Names = {
    name: []
  };

  t0: number = 0;
  t1: number = 0;

  config: Config = {
    phrases: [],
    config: [],
    alphabet: [],
    tags: [],
    tag_names: []
  };

  
  regexEscape(str: string): string {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  replaceId(id: number, lang: number): string {
    (this.names.name) ? this.getNames() : null;
    return this.names.name[lang][id];
  }

  replaceTag(id: number, lang: number): string {
    (this.config.tag_names) ? this.getConfig() : null;
    return this.config.tag_names[id][lang];
  }

  replaceElement(element: string, lang: number): string{
    (this.config.phrases) ? this.getConfig() : null;
    const values = [...element.matchAll(/\{(\d\d?\d?)\}/g)]                     // Retrieve all substrings from element of structure '{[number]}' and convert it into an array
    const unique_values = [...new Set(values.map(first => first[1]))];          // Create two arrays, one with and one without the curly brackets.
    const par_values = [...new Set(values.map(first => first[0]))];
    for (let repl_value = 0; repl_value < unique_values.length; repl_value++) { //Replace numbers with the element within the given index in Config or Phrases
      element = element.replace(new RegExp(this.regexEscape(par_values[repl_value]), 'g'), this.config.phrases[parseInt(unique_values[repl_value])][lang]);
    }
    return element;
  }

  getConfig(): void {
    this.LoadDataService.getConfig()
      .subscribe(config => this.config = config);
  }

  getNames(): void {
    this.LoadDataService.getNames()
      .subscribe(names => this.names = names);
  }
}
