import { Component, OnInit } from '@angular/core';

import { HostSetting } from '../../tables/host-setting';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'],
  // define providers since HostSetting isn't provided in app.module.ts
  providers: [ HostSetting ]
})
export class ApiComponent implements OnInit {
  private backend: string;

  constructor(private hostSetting: HostSetting) { }

  ngOnInit() {
    this.backend = this.hostSetting.getHost();
  }

  formatURL(endpoint: string, id?: string, format?: string) {
    let url = this.backend + `${endpoint}/`;

    if (id) {
      url += `${id}/`;
    }

    if (format) {
      url += `?format=${format}`;
    }

    return url;
  }

  getOrganism(id?: string, format?: string) {
    return this.formatURL('organism', id, format);
  }

  getFile(id?: string, format?: string) {
    return this.formatURL('file', id, format);
  }

  getSpecimen(id?: string, format?: string) {
    return this.formatURL('specimen', id, format);
  }

}
