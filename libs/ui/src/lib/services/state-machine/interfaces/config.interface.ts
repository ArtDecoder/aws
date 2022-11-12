import { StateInterface } from './state.interface'
export interface ConfigInterface<Context> {
  initialState: string
  initialContext?: Context
  states: {
    [key: string]: StateInterface<Context>
  }
}
