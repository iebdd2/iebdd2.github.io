import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from '../Services/lang.service';
import { ReplacementService } from '../Services/replacement.service';
import { Lang } from '../recipe';

@Pipe({
  name: 'Tag'
})
export class TagPipe implements PipeTransform {

  constructor(private ReplacementService: ReplacementService,
    private LangService: LangService) {
      this.lang = Lang.en;
}
lang: number;

transform(id: number): string {
return this.ReplacementService.replaceTag(id, this.lang)
}

getLang(): void {
this.LangService.getLang()
.subscribe(lang => { this.lang = lang })
}

ngOnInit() {
this.getLang();
} 
}
