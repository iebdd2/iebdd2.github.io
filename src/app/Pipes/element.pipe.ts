import { Pipe, PipeTransform } from '@angular/core';
import { ReplacementService } from '../Services/replacement.service';

@Pipe({
  name: 'Element'
})
export class ElementPipe implements PipeTransform {

  constructor(private ReplacementService: ReplacementService) {}

  transform(element: string, lang: number): string {
    return this.ReplacementService.replaceElement(element, lang);
  }

}
