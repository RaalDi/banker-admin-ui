import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate } from '../authenticate/authenticate.service';

@Component({
  selector: 'banker',
  templateUrl: './banker.component.html'
})

export class BankerComponent {
  title = 'Banker';

  constructor(private auth: Authenticate, private router: Router) { }

  ngOnInit() {
    if (this.auth.canActivate()) {
      this.title = 'Welcome ' + this.auth.getSignedUsername();
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  onSignOut() {
    this.auth.signOut()
      .subscribe(
      () => this.router.navigate(['/sign-in']),
    );
  }
}