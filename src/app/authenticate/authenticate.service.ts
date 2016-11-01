import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CanActivate } from '@angular/router';
import { AuthHttp, tokenNotExpired, JwtHelper, AuthConfigConsts } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/core';
import { User } from "../model";

@Injectable()
export class Authenticate implements CanActivate {
  private serverUrl: string = 'http://banker.com:8080/api';
  private token: string;
  private tokenHeader: string = 'X-Security-Token';
  private signedUser: User;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private authHttp: AuthHttp, private cookieService: CookieService) {
    this.setSignedUser();
  }

  signIn(username: String, password: String) {

    return this.http.post(this.serverUrl + '/auth/sign-in', JSON.stringify({
      username: username,
      password: password
    }),
      {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map((res: Response) => {
        console.log('Headers ' + res.headers.keys());
        this.token = res.headers.get(this.tokenHeader);
        console.log('Token: ' + this.token);
        this.cookieService.put(AuthConfigConsts.DEFAULT_TOKEN_NAME, this.token);
        this.setSignedUser();
      }).catch((error: any) => Observable.throw(error.json().error));
  }

  signOut() {
    console.log("User: " + this.signedUser);
    if (this.signedUser) {
      return this.authHttp.get(this.serverUrl + '/auth/sign-out/' + this.signedUser.username)
        .map((res: any) => {
          this.token = undefined;
          this.cookieService.remove(AuthConfigConsts.DEFAULT_TOKEN_NAME);
        });
    }
  }

  canActivate() {
    return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
  }

  getSignedUser() {
    return this.signedUser;
  }

  private setToken() {
    if (this.token == undefined) {
      this.token = this.cookieService.get(AuthConfigConsts.DEFAULT_TOKEN_NAME);
    }
  }

  private extractUserFromToken() {
    if (this.token) {
      let obj: any = this.jwtHelper.decodeToken(this.token);
      console.log("Token: " + this.token);
      console.log("Token Object:",
        obj
      );
      this.signedUser = JSON.parse(obj.user);
    }
  }

  private setSignedUser() {
    this.setToken();
    this.extractUserFromToken();
  }

  private logError(err) {
    console.error('There was an error: ' + err);
  }
}