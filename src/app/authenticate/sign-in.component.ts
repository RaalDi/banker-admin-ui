import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate } from '../authenticate/authenticate.service';
import { SignInRequest } from './sign-in-request';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html'
})

export class SignInComponent {
  title = 'Entre al Sistema';
  request: SignInRequest = new SignInRequest();
  error: boolean = false;
  message: String;

  constructor(private auth: Authenticate, private router: Router) { }

  ngOnInit() {
    if (this.auth.canActivate()) {
      this.routeToBanker();
    }
  }

  onSubmit() {
    console.log(this.request);
    this.auth.signIn(this.request.username, this.request.password)
      .subscribe(
      (res: any) => this.routeToBanker(),
      (err: any) => { 
        this.error = true; 
        console.log('Error: ' + err);
        this.message = err;
      },
      () => console.log('Authentication Completed for username: ' + this.request.username)
      );
  }

  private routeToBanker() {
    this.router.navigate(['/banker']);
  }
}