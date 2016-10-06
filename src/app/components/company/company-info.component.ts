import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'company-info',
  templateUrl: './company-info.component.html'
})

export class CompanyInfoComponent {
  title = 'Company Information';

  constructor(private router: Router) { }

  ngOnInit() {
    //this.router.navigate(['/sign-in']);
  }

  onSubmit() {
    //console.log(this.signIn);
    //this.router.navigate(['/banker']);
  }

}