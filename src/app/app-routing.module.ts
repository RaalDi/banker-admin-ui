import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent }  from './components/sign-in/sign-in.component';
import { BankerComponent }    from './components/banker/banker.component';
import { CompanyInfoComponent }    from './components/company/company-info.component';
import { PageNotFoundComponent }    from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'banker', component: BankerComponent },
  { path: 'company-info', component: CompanyInfoComponent },
  { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class BankerUiRoutingModule { }
