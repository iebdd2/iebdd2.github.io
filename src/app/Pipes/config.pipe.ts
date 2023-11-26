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

  transform(index: number, lang: number, repl: string = ''): string {
    (this.config.phrases) ? this.getConfig() : null;
    let re_value: string;
    if (repl.length) {
      re_value = this.config.config[index][lang].replace('%s', repl);
    }
    else {
      re_value = this.config.config[index][lang];
    }
    return re_value;
  }

  getConfig(): void {
    this.LoadDataService.getConfig()
      .subscribe(config => this.config = config);
  }

}
