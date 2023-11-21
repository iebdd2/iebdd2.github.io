import { Pipe, PipeTransform } from '@angular/core';
import { LoadDataService } from '../Services/load-data.service';
import { Config } from '../recipe';

@Pipe({
  name: 'Icon'
})
export class IconPipe implements PipeTransform {

  constructor(private LoadDataService: LoadDataService){}

  sequence: number[] = [14, 13, 9, 8, 4, 3];
  config: Config = {
    phrases: [],
    config: [],
    alphabet: [],
    tags: [],
    tag_names: []
  };

  transform(id: number): number {
    (this.config.phrases) ? this.getConfig() : null;
    for(let i = 0; i < this.sequence.length; i++) {
      if(this.config.tags[this.sequence[i]].includes(id)) {
        return this.sequence[i];
      }
    }
    return -1;
  }

  getConfig(): void {
    this.LoadDataService.getConfig()
      .subscribe(config => this.config = config);
  }
}
