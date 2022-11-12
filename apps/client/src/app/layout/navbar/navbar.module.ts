import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { SvgModule } from '@aws/ui'
import { NavbarComponent } from './navbar.component'
import { NavbarToggleComponent } from './navbar-toggle/navbar-toggle.component'

@NgModule({
  declarations: [NavbarComponent, NavbarToggleComponent],
  imports: [CommonModule, RouterModule, BrowserAnimationsModule, SvgModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
