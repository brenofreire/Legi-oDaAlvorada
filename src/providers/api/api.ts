import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ApiProvider {
  private url = 'http://localhost:8000/';
  // private url = 'https://apilegiao.herokuapp.com/';
  constructor(
    public http: HttpClient,
    public storage: Storage

  ) {
  }
  get(url_dinamica){
    return new Promise ((response, error) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'api-legiao-123123123'
      });
      this.http.get(this.url + url_dinamica, {
        headers: headers
      }).subscribe( data => {
        response(data);
      }, err => {
        console.log(err);        
      });
    });
  }
  post(url_dinamica, body){
    return new Promise ((response, error) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.http.post(this.url + url_dinamica, body, {
        headers: headers
      }).subscribe(data => {
        response(data)
      }, err => {
        error(err['error'])
      });
    });
  }
}
