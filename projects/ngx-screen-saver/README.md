# ngx-screen-saver

## Installation guide:

Screen savers depend on additional assets, you'll have to modify your `angular.json` file to add them:

```
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "node_modules/ngx-screen-saver/dist/ngx-screen-saver/assets",
    "output": "assets/ngx-screen-saver"
  }
]
```

You will also need to install p5.js peer dependency:

`npm install p5.js`

## About:

TODO
