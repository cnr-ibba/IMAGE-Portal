
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class HostSetting {
  host: string = environment.backend;

  public getHost(): string {
    return this.host;
  }

  setHost(host: string) {
    this.host = host;
  }
}
