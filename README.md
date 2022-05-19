# ngx-screen-saver

## About:

Screen saver component for Angular.
Screen saver will appear when user is being idle for certain amount of time.

You can check them out on this demo website: TODO

This library uses `p5.js` under the hood.

## Installation guide:

Install library using npm:

`npm install ngx-screen-saver`

Screen savers depend on additional assets, you'll have to modify your `angular.json` file to add them:

```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "node_modules/ngx-screen-saver/assets",
    "output": "assets/ngx-screen-saver"
  }
]
```

<!-- You will also need to install p5.js peer dependency:

`npm install p5.js` -->

## Usage:

Add `NgxScreenSaverModule` to imports array in Angular module:

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxScreenSaverModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Put `ngx-screen-saver` component in the template (preferably in `app.component.html`):

```html
<ngx-screen-saver></ngx-screen-saver>
```

## Configuration:

You can pass following optional inputs to the component:

**idleAfterMs**: time from last user activity after which the screen saver will appear (in miliseconds).
Default value: 10000 (10 seconds).

**variant**: screen saver variant to show. Available variants: "fireworks", "dvd", "stars".
Default value: "fireworks".

**opacity**: screen saver opacity. 0 is transparent, 1 is opaque. Defaults to 1.

**zIndex**: screen saver z-index CSS value. Defaults to 1.

Example:

```html
<ngx-screen-saver
  [opacity]="0.8"
  [zIndex]="2"
  [idleAfterMs]="2000"
  [variant]="'dvd'"
></ngx-screen-saver>
```
