import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SignInService {
  private signInUrl: String = "http://localhost/users";

  constructor(private http: Http) { }

}
