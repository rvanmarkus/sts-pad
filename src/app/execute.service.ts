import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ExecuteService {
  private serverURL: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  getAllScripts() : Observable<any[]>{
    return this.http.get(`${this.serverURL}/scripts`)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
}
