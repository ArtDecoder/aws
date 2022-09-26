import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {SvgModule} from '@aws/ui'
import {NavbarComponent} from './navbar.component'

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SvgModule
  ],
  exports: [
    NavbarComponent,
  ],
})
export class NavbarModule {
}
