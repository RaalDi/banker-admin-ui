import { Component } from '@angular/core';
import { Authenticate } from './authenticate/authenticate.service';
import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Banker';

  constructor(private auth: Authenticate){}

  signOut(){
    this.auth.signOut();
  }
}
