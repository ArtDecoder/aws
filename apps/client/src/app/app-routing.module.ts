import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {AppRouteInterface} from '@aws/core'
import {AboutPageComponent} from './pages/about-page/about-page.component'
import {ContactsPageComponent} from './pages/contacts-page/contacts-page.component'
import {HomePageComponent} from './pages/home-page/home-page.component'
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component'

const routes: AppRouteInterface[] = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
    data: {
      meta: {
        title: 'Главная',
      },
    },
  },
  {
    path: 'contacts',
    component: ContactsPageComponent,
    pathMatch: 'full',
    data: {
      meta: {
        title: 'Контакты',
      },
    },
  },
  {
    path: 'about',
    component: AboutPageComponent,
    pathMatch: 'full',
    data: {
      meta: {
        title: 'О Нас',
      },
    },
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
