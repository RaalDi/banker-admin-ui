import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate } from '../authenticate/authenticate.service';
import { SignInRequest } from './sign-in-request';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html'
})

export class SignInComponent {
  private title = 'Entre al Sistema';
  private request: SignInRequest = new SignInRequest();
  private error: boolean = false;
  private message: String;
  private isCaptcha: boolean = false;
  private captcha: String;

  constructor(private auth: Authenticate, private router: Router) {
    //Captcha
    //window['verifyCaptcha'] = this.verifyCaptcha.bind(this);
  }

  ngOnInit() {
    if (this.auth.canActivate()) {
      this.routeToBanker();
    }
  }

  onSubmit() {
    console.log(this.request);
    this.isCaptcha = false;
    this.auth.signIn(this.request.username, this.request.password, this.captcha)
      .subscribe(
      (res: any) => { 
        this.routeToBanker(); 
      },
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

  //Captcha
  private verifyCaptcha(response) {
    document.getElementById('btn1').removeAttribute("disabled");
    this.isCaptcha = true;
    this.captcha = response;
    alert("Captcha is Selected");
  }
}