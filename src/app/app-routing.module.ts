import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMePageComponent } from './about-me-page/about-me-page.component';
import { BettingPageComponent } from './betting-page/betting-page.component';

const routes: Routes = [
	{path: 'about-me', component: AboutMePageComponent},
	{path: '', redirectTo: 'about-me', pathMatch: "full"},
	{path: 'betting', component: BettingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
