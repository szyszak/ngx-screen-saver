import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import p5 from 'p5';

import { stars, dvd, fireworks } from '../../screen-savers';

type ScreenSaverOption = 'stars' | 'dvd' | 'fireworks';

@Component({
  selector: 'ngx-screen-saver',
  template: '',
  styleUrls: ['./ngx-screen-saver.component.scss'],
})
export class NgxScreenSaverComponent implements OnInit, OnDestroy {
  constructor(private userIdleService: UserIdleService) {}

  @Input() idle: number = 10;
  @Input() variant: ScreenSaverOption = 'fireworks';
  @Input() opacity: number = 1;
  @Input() zIndex: number = 1;

  showScreenSaver: boolean = false;
  numberOfSecondsScreenSaverIsShowing: number = 0;
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

    this.userIdleService.setConfigValues({
      idle: this.idle,
      idleSensitivity: 0,
    });

    this.userIdleService.startWatching();

    this.userIdleService.onTimerStart().subscribe((val) => {
      console.log(`ON TIMER START: ${val}`);
      if (val === null) {
        this.showScreenSaver = false;
        this.numberOfSecondsScreenSaverIsShowing = 0;
        this.screenSaver?.remove();
        this.screenSaver = undefined;
      } else {
        this.showScreenSaver = true;
        this.numberOfSecondsScreenSaverIsShowing = val;

        if (this.screenSaver === undefined) {
          this.screenSaver = new p5(
            this.screenSavers[this.variant],
            document.querySelector('ngx-screen-saver')! as HTMLElement
          );
        }
      }
    });

    this.userIdleService.onIdleStatusChanged().subscribe((val) => {
      console.log(`is user idle: ${val}`);
    });

    // @ts-ignore
    this.userIdleService.idle$.subscribe((event) => {
      this.userIdleService.resetTimer();
    });
  }

  ngOnDestroy(): void {
    this.userIdleService.stopWatching();
  }
}
