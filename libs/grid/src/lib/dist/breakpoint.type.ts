import {BreakpointEnum} from './breakpoint.enum'

export type BreakpointsType = {
  [key in keyof typeof BreakpointEnum]: { minWidth: number, maxWidth: number }
}
