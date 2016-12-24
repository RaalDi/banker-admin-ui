import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CanActivate } from '@angular/router';
import { AuthHttp, tokenNotExpired, JwtHelper, AuthConfigConsts } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/core';
import { User } from "../model";

@Injectable()
export class Authenticate implements CanActivate {
  private SERVER_URL: string = 'http://banker.com:8080/api';
  private USERNAME_KEY: string = 'username_key';
  private token: string;
  private tokenHeader: string = 'X-Security-Token';
  private username: string;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private authHttp: AuthHttp, private cookieService: CookieService) {
    // this.upateSignedUser();
  }

  signIn(username: String, password: String, captcha: String) {
    let data = "username=" + username + "&password="
      + password + "&grant_type=password";
    //console.log('decode: ' + atob('YmFua2VyOklMb3ZlU2VhRm9vZA=='));
    return this.http.post(this.SERVER_URL + '/oauth/token', data,
      {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Basic ' + btoa('banker' + ':' + 'ILoveSeaFood')
          //'Access-Control-Allow-Origin': '*',
          //'Content-Type': 'application/json'
        })
      })
      .map((res: Response) => {
        this.setToken(res.json().access_token);
        //console.log('Token: ' + this.token);
        return this.getToken();
      }).flatMap((token: String) => {
        if (token) {
          return this.getAuthUsername();
        }
      }).catch((error: any) => Observable.throw(error.json().error));
  }

  signOut() {
    console.log("User: " + this.getUsername());
    if (this.getUsername()) {
      return this.authHttp.get(this.SERVER_URL + '/auth/sign-out/' + this.getUsername())
        .map((res: any) => {
          this.token = undefined;
          this.username = undefined;
          this.cookieService.remove(AuthConfigConsts.DEFAULT_TOKEN_NAME);
          this.cookieService.remove(this.USERNAME_KEY);
        });
    }
  }

  canActivate() {
    return this.getToken() != null && !this.jwtHelper.isTokenExpired(this.getToken());
  }

  getSignedUsername() {
    //this.getUsername().subscribe((res: any) => { 
    //  console.log('OKKKK: ' + res); 
    //  this.username = res;
    //  console.log('Username: ' + this.username);
    //  return this.username;
    // });

    return this.getUsername();
  }

  private getAuthUsername() {
    console.log('Username: ' + this.username);
    if (this.username == undefined) {
      return this.authHttp.get(this.SERVER_URL + '/auth/user').map((res: Response) => {
        console.log('Get User Response ' + res.text());
        this.setUsername(res.text());
      }).catch((error: any) => Observable.throw(error.json().error));
    }
  }

  private getUsername() {
    if (this.username == undefined) {
      this.username = this.cookieService.get(this.USERNAME_KEY);
    }
    return this.username;
  }

  private setUsername(username: string) {
    this.username = username;
    this.cookieService.put(this.USERNAME_KEY, this.username);
  }

  private getToken() {
    if (this.token == undefined) {
      this.token = this.cookieService.get(AuthConfigConsts.DEFAULT_TOKEN_NAME);
    }
    return this.token;
  }

  private setToken(token: string) {
    this.token = token;
    this.cookieService.put(AuthConfigConsts.DEFAULT_TOKEN_NAME, this.token);
  }

  private extractBetFromToken() {
    if (this.token) {
      let obj: any = this.jwtHelper.decodeToken(this.token);
      console.log("Token: " + this.token);
      console.log("Token Object:", obj);
      this.username = JSON.parse(obj.user);
    }
  }

  private upateSignedUser() {
    if (this.getToken()) {
      //this.getUsername().subscribe(res => this.username = res);;
    }
  }

  private logError(err) {
    console.error('There was an error: ' + err);
  }
}