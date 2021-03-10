import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public httpClient: HttpClient
  ) { }

  linkGeneration(param1, param2) {
    const host = window.location.hostname;
    return param1.protocol + '://' + host + ':' + param1.port + param1.apiPrefix + param2;
  }

  getSlotList() {
    const url = this.linkGeneration(environment.schedulerMgmtService, environment.schedulerMgmtService.getSlotList);
    return this.httpClient.get<any>(url, { responseType: 'json' });
  }

  addNewSlot(body) {
    const url = this.linkGeneration(environment.schedulerMgmtService, environment.schedulerMgmtService.createSlot);
    return this.httpClient.post<any>(url, body, { responseType: 'json' });
  }
}
