import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { User,  } from '../blObjects/user';
// import {JwtHelperService} from '@auth0/angular-jwt';
import { BaseService } from './base.service';




@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {


  constructor(private httpClient: HttpClient) { super();}


  registerUser(user: User) {
    return this.httpClient.post<User>(this.domain + this.postUrl, user);
  }

  login(user) {
    return this.httpClient.post<User>(this.domain + this.postLoginUrl, user);
  }


}
