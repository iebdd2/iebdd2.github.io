import { Pipe, PipeTransform } from '@angular/core';
import { LoadDataService } from '../Services/load-data.service';
import { Config } from '../recipe';

@Pipe({
  name: 'Config'
})
export class ConfigPipe implements PipeTransform {

  constructor(private LoadDataService: LoadDataService) {}

  config: Config = {
    phrases: [],
    config: [],
    alphabet: [],
    tags: [],
    tag_names: []
  };

  transform(index: number, lang: number): string {
    (this.config.phrases) ? this.getConfig() : null;
    return this.config.config[index][lang];
  }

  getConfig(): void {
    this.LoadDataService.getConfig()
      .subscribe(config => this.config = config);
  }

}
