import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import p5 from 'p5';
import { Subscription } from 'rxjs';

import { stars, dvd, fireworks } from '../../screen-savers';
import { IdleDetectionService } from '../../services/idle-detection.service';

export type ScreenSaverOption = 'stars' | 'dvd' | 'fireworks';

@Component({
  selector: 'ngx-screen-saver',
  template: '',
  styleUrls: ['./ngx-screen-saver.component.scss'],
})
export class NgxScreenSaverComponent implements OnInit, OnDestroy {
  constructor(private idleDetectionService: IdleDetectionService) {}

  @Input() idleAfterMs: number = 10000;
  @Input() variant: ScreenSaverOption = 'fireworks';
  @Input() opacity: number = 1;
  @Input() zIndex: number = 1;

  isIdleSubscription!: Subscription;

  showScreenSaver: boolean = false;
  screenSaver?: p5;

  screenSavers = {
    stars,
    dvd,
    fireworks,
  };

  ngOnInit(): void {
    document.documentElement.style.setProperty(
      '--ngx-screen-saver-opacity',
      this.opacity.toString()
    );

    document.documentElement.style.setProperty(
      '--ngx-screen-saver-z-index',
      this.zIndex.toString()
    );

    this.idleDetectionService.startIdleDetection(this.idleAfterMs);

    this.isIdleSubscription = this.idleDetectionService.isIdle$.subscribe(
      (isIdle) => {
        if (isIdle === true) {
          this.showScreenSaver = true;

          this.screenSaver = new p5(
            this.screenSavers[this.variant],
            document.querySelector('ngx-screen-saver')! as HTMLElement
          );
        } else {
          this.showScreenSaver = false;
          this.screenSaver?.remove();
          this.screenSaver = undefined;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.idleDetectionService.stopIdleDetection();
    this.isIdleSubscription.unsubscribe();
  }
}
