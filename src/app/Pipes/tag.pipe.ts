import { Pipe, PipeTransform } from '@angular/core';
import { ReplacementService } from '../Services/replacement.service';

@Pipe({
  name: 'Tag'
})
export class TagPipe implements PipeTransform {

  constructor(private ReplacementService: ReplacementService) {}

transform(id: number, lang: number): string {
return this.ReplacementService.replaceTag(id, lang)
}
}
