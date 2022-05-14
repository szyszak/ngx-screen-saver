import { Injectable, NgZone } from '@angular/core';
import { Subscription, BehaviorSubject, fromEvent, merge, timer } from 'rxjs';
import { switchMap, tap, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IdleDetectionService {
  // i tak ingerujemy w komponenty angulara, czy umijanie changeDetection przez ngZone jest konieczne?
  constructor(private ngZone: NgZone) {}

  idleAfterMs!: number;

  private isIdleSubject = new BehaviorSubject<boolean>(false);
  public isIdle$ = this.isIdleSubject.asObservable();

  private activityEvents$ = merge(
    fromEvent(window, 'mousemove'),
    fromEvent(window, 'resize'),
    fromEvent(document, 'keydown'),
    fromEvent(document, 'mousedown'),
    fromEvent(document, 'touchstart')
  );

  private idleDetectionSubscription?: Subscription;

  startIdleDetection(idleAfterMs: number) {
    this.idleAfterMs = idleAfterMs;

    this.idleDetectionSubscription = this.activityEvents$
      .pipe(
        // trigger idle detection before any user activity events
        startWith(undefined),
        tap(() => {
          this.isIdleSubject.next(false);
        }),
        switchMap(() => {
          return timer(this.idleAfterMs).pipe(
            tap(() => {
              this.isIdleSubject.next(true);
            })
          );
        })
      )
      .subscribe();
  }

  stopIdleDetection() {
    this.idleDetectionSubscription?.unsubscribe();
  }
}
