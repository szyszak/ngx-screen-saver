import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import p5 from 'p5';

import { stars, dvd, fireworks } from '../../screen-savers';
import { IdleDetectionService } from '../../services/idle-detection.service';

type ScreenSaverOption = 'stars' | 'dvd' | 'fireworks';

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

  showScreenSaver: boolean = false;
  screenSaver?: p5;

  screenSavers = {
    stars,
    dvd,
    fireworks,
  };

  // screenSaver = new p5(stars);
  // screenSaver = new p5(dvd);
  // screenSaver = new p5(fireworks);

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

    this.idleDetectionService.isIdle$.subscribe((isIdle) => {
      if (isIdle === true) {
        this.showScreenSaver = true;

        if (this.screenSaver === undefined) {
          this.screenSaver = new p5(
            this.screenSavers[this.variant],
            document.querySelector('ngx-screen-saver')! as HTMLElement
          );
        }
      } else {
        this.showScreenSaver = false;
        this.screenSaver?.remove();
        this.screenSaver = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.idleDetectionService.stopIdleDetection();
  }
}
