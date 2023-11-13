import { Pipe, PipeTransform } from '@angular/core';
import { ReplacementService } from '../Services/replacement.service';


@Pipe({
  name: 'Id'
})
export class IdPipe implements PipeTransform {
  
  constructor(private ReplacementService: ReplacementService) {}

  transform(id: number, lang: number): string {
    return this.ReplacementService.replaceId(id, lang)
  }
}
