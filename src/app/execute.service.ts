import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Script} from "./script";

@Injectable()
export class ExecuteService {
  private serverURL: string = '/api';

  constructor(private http: Http) {
  }

  getAllScripts(): Observable<Script[]> {
    return this.http.get(`${this.serverURL}/scripts`)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  execute(script: Script) {
    return this.http.post(`${this.serverURL}/execute`, script).delay(500).map(this.extractData).merge(Observable.of({execution: false}));
  }
}
