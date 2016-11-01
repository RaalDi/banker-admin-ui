import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankerComponent } from './banker/banker.component';
import { CompanyInfoComponent } from './company/company-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './authenticate/sign-in.component';
import { Authenticate } from './authenticate/authenticate.service';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'banker', component: BankerComponent, canActivate: [Authenticate]},
  { path: 'company-info', component: CompanyInfoComponent, canActivate: [Authenticate] },
  { path: '**', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class BankerUiRoutingModule { }
