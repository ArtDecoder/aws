import {Route} from '@angular/router'
import {AppRouteDataInterface} from './app-route-data.interface'

export interface AppRouteInterface extends Route {
  children?: AppRouteInterface[],
  data?: AppRouteDataInterface
}
