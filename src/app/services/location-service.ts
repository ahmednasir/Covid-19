import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {
  constructor(public http: HttpClient) {}

  getLocations():Observable<any>{
    let URL = "http://www.zerund.com:5000/getData";
    return this.http.get(URL)
  } 
}
