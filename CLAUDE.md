# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Frontend for the IMAGE Data Portal (livestock genebank data). The repo root only holds `README.md`, `.travis.yml` and the `IMAGE-frontend/` Angular app — all commands below run from `IMAGE-frontend/`. There is no backend here: the app talks to the separate [IMAGE-CommonDataPool](https://github.com/cnr-ibba/IMAGE-CommonDataPool) REST API.

Stack: Angular 8 (CLI 8.3), Angular Material 6 + Flex Layout, Leaflet (+ draw, markercluster, geotiff) for maps, ng2-charts/Chart.js, Karma/Jasmine unit tests, Protractor e2e, TSLint. CI targets Node 10.

## Commands

```
npm install
ng serve                       # dev server at http://localhost:4200 (uses environment.ts -> local backend)
ng lint
ng test                        # Karma, watch mode
ng test --no-watch --no-progress --browsers=ChromeHeadlessCI   # as in CI
ng test --include='**/cdp.service.spec.ts'                      # single spec (Angular 8.1+ CLI)
ng e2e --protractor-config=e2e/protractor-ci.conf.js            # CI e2e config
ng build --prod --base-href https://cnr-ibba.github.io/IMAGE-Portal/   # what CI deploys
ng build --configuration=test  # build against the test API
```

CI (`.travis.yml`, branches `master` and `devel`) runs lint → unit tests → e2e → prod build, and deploys `dist/IMAGE-frontend/` to GitHub Pages from `master`. Work happens on `devel`; `master` is release.

## Architecture

- **Backend host is chosen by build configuration** via `angular.json` `fileReplacements` of `src/environments/environment*.ts`: default → `http://localhost:26081/backend/`, `test` → `https://apitest.image2020genebank.eu/backend/`, `production` → `environment.prod.ts`. Services read `environment.host`; to develop against a local backend, run the CommonDataPool on port 26081.
- **Routing** (`app-routing.module.ts`): most pages are eager components declared in `AppModule` (home, search, summary, about, help, breeders-interface, gis-search). `tables` is lazy-loaded (`tables.module.ts`) and contains the organisms/specimens/files list + detail views, shared `filters`, and `TablesService` (the main REST client for organisms, specimens, files, search and summary data).
- **GIS search** (`app/gis-search/`) is its own module. `cdp.service.ts` holds the Common Data Pool HTTP calls plus the GeoJSON types (`GeoOrganism`, `GeoSpecimen`) and the form/filter helpers shared by the organisms and specimens sub-components; `map.service.ts` encapsulates Leaflet map setup and layers.
- Material components are centralized in `material.module.ts`; add new Material imports there rather than per-module.
- The app is a PWA (`ngsw-config.json`, `manifest.webmanifest`, `@angular/pwa`).
