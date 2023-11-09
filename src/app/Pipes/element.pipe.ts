import { Pipe, PipeTransform } from '@angular/core';
import { ReplacementService } from '../Services/replacement.service';
import { LangService } from '../Services/lang.service';
import { Lang } from '../recipe';

@Pipe({
  name: 'Element'
})
export class ElementPipe implements PipeTransform {

  constructor(private ReplacementService: ReplacementService,
              private LangService: LangService) {
    this.lang = Lang.de;
  }
  lang: number;

  transform(element: string): string {
    return this.ReplacementService.replaceElement(element, this.lang);
  }

  getLang(): void {
    this.LangService.getLang()
    .subscribe(lang => { this.lang = lang })
  }

  ngOnInit() {
    this.getLang();
  }

}
