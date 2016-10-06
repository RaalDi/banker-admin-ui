import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html'
})

export class SignInComponent {
  title = 'Sign In';
  signIn: Object = {};
  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.signIn);
    this.router.navigate(['/banker']);
  }
}