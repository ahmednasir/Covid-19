import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: "root"
})
export class NewsServiceService {
  constructor(private http: HttpClient) {}

  getNews():Observable<any>{
    let URL = "http://www.zerund.com:5000/getNews"
    return this.http.get<any>(URL,{
      observe: "response"
    });
  }
}
