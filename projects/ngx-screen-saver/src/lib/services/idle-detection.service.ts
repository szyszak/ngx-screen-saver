import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject, fromEvent, merge, timer } from 'rxjs';
import { switchMap, tap, startWith, throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IdleDetectionService {
  constructor() {}

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
        throttleTime(100),
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
