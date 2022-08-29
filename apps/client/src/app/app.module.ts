import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppRoutingModule} from './app-routing.module'

import {AppComponent} from './app.component'
import {FooterModule} from './layout/footer/footer.module'
import {HeaderModule} from './layout/header/header.module'
import {NavbarModule} from './layout/navbar/navbar.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    NavbarModule,
    FooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
