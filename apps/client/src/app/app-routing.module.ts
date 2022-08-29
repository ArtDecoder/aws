import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AboutPageComponent} from './pages/about-page/about-page.component'
import {HomePageComponent} from './pages/home-page/home-page.component'
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component'

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutPageComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
