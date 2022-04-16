import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxScreenSaverModule } from 'ngx-screen-saver';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxScreenSaverModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
