import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {DrawerAsideComponent} from './drawer-aside/drawer-aside.component'
import {DrawerContentComponent} from './drawer-content/drawer-content.component'
import {DrawerComponent} from './drawer.component'
import {AnimationService} from './services/animation.service'

@NgModule({
  declarations: [DrawerComponent, DrawerContentComponent, DrawerAsideComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [DrawerComponent, DrawerAsideComponent, DrawerContentComponent],
  providers: [AnimationService]
})
export class DrawerModule {
}
