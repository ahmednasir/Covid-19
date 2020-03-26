import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FAQService {
  constructor(public http: HttpClient) {}

  getFaq():Observable<any>{
    let URL = "http://www.zerund.com:5000/getFaq";
    return this.http.get(URL)
  } 
}
