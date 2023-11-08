import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Subject, takeUntil, Observable } from 'rxjs';
import { Screen } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService implements OnDestroy {

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
    .observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Handset
    ])
    .pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      (result.matches) ? (this.screenSize.next(Screen.handheld), console.log('handheld')) : (this.screenSize.next(Screen.notHandheld), console.log('not_handheld'));
    })
   }

   private screenSize = new BehaviorSubject<number>(Screen.notHandheld);
   destroyed = new Subject<void>();

   getSize(): Observable<number> {
    return this.screenSize.asObservable();
   }

   ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
   }
}
