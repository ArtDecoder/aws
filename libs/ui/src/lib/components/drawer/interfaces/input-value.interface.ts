import {DrawerDirectionEnum} from './drawer-direction.enum'
import {DrawerModeEnum} from './drawer-mode.enum'

export interface InputValueInterface {
  asideSize?: number
  autoClose?: boolean,
  mode?: DrawerModeEnum
  direction?: DrawerDirectionEnum
  backdrop?: boolean
}
