import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private _http:Http){

   }

  isLoggedIn(){
    return false;
  }

  details(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var body = {"project_name" : "PRJ1"};
    return this._http.post('http://localhost:1212/getprojectdetails', body,{headers})
    .map((res) => res.json());
  }
}
