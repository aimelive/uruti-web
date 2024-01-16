import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OurWorkComponent } from './components/our-work/our-work.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'about',
    title: 'About',
    component: AboutComponent,
  },
  {
    path: 'our-work',
    title: 'Our Work',
    component: OurWorkComponent,
  },
  { path: '**', title: 'Page Not Found', component: PageNotFoundComponent },
].map((route) => ({ ...route, title: route.title + ' - Uruti Hub' }));
