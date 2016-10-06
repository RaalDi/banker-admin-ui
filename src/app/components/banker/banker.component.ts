import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'banker',
  templateUrl: './banker.component.html'
})

export class BankerComponent {
  title = 'Banker';

  constructor(private router: Router) { }

  ngOnInit() {
    //this.router.navigate(['/sign-in']);
  }

}