import { Pipe, PipeTransform } from '@angular/core';
import { LoadDataService } from '../Services/load-data.service';
import { Config } from '../recipe';

@Pipe({
  name: 'Icon'
})
export class IconPipe implements PipeTransform {

  constructor(private LoadDataService: LoadDataService){}

  sequence: number[] = [17, 16, 15, 14, 13, 9, 8, 4, 3];
  svg: string[] = ['easter', 'christmas', 'wreath', 'pizza', 'burger', 'baguette', 'croissant', 'bread-roll', 'round-bread', 'bread'];
  config: Config = {
    phrases: [],
    config: [],
    alphabet: [],
    tags: [],
    tag_names: []
  };

  transform(id: number): string {
    (this.config.phrases) ? this.getConfig() : null;
    for(let i = 0; i < this.sequence.length; i++) {
      if(this.config.tags[this.sequence[i]].includes(id)) {
        return this.svg[i];
      }
    }
    return this.svg[this.svg.length - 1];
  }

  getConfig(): void {
    this.LoadDataService.getConfig()
      .subscribe(config => this.config = config);
  }
}
