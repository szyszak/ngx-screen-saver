import { NgModule } from '@angular/core';
import { NgxScreenSaverComponent } from './components/screen-saver/ngx-screen-saver.component';
import { UserIdleModule } from 'angular-user-idle';

@NgModule({
  declarations: [NgxScreenSaverComponent],
  imports: [UserIdleModule.forRoot({ idle: 10 })],
  exports: [NgxScreenSaverComponent],
})
export class NgxScreenSaverModule {}
