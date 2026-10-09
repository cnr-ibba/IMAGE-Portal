# IMAGE-portal frontend

## Setup environment

The Angular CLI (`ng`, version 8.3) is a project dependency: do **not** install it globally
(a recent global version is incompatible with this Angular 8 project). Create a conda
environment with Node.js only, then install the dependencies:

```
$ conda create -n image-portal -c conda-forge nodejs=14
$ conda activate image-portal
```

## Install dependencies

```
$ npm ci
```

Use `npm install` instead if you need to update `package-lock.json`. The `ng` command is then
available through the npm scripts below, or with `npx ng <command>`.

## Upgrade a package:

```
$ npm install <package>@<version> [--save-dev]
```

## To run backend for this app:

Please see IMAGE-CommonDataPool [README.md at GitHub](https://github.com/cnr-ibba/IMAGE-CommonDataPool)

## Development server

Run `npm start` (or `npx ng serve`) for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

The build artifacts will be stored in the `dist/` directory:

```
$ npm run build            # development build
$ npm run build:prod       # production build
$ npm run build:test       # build against the test API
$ npm run build:gh-pages   # production build with the GitHub Pages base-href (as in CI)
$ npm run clean:dist       # remove old build artifacts (dist/)
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
