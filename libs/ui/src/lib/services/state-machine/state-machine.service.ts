import {Injectable} from '@angular/core'
import {ConfigInterface} from './interfaces/config.interface'
import {EventObjectInterface} from './interfaces/event-object.interface'
import {StateInterface} from './interfaces/state.interface'

@Injectable()
export class StateMachineService<Context> {
  private _currentState = ''
  private _context: Context | undefined
  private _states!: { [key: string]: StateInterface<Context> }

  init(config: ConfigInterface<Context>): void {
    this._currentState = config.initialState
    this._context = config.initialContext
    this._states = config.states
  }

  get context(): Context | undefined {
    return this._context
  }

  assign(context: Context): void {
    if(this.context) {
    this._context = {
      ...this._context,
      ...context,
    }
    return
    }
    this._context = context
  }

  dispatch(event: EventObjectInterface): void {

    if (this._states) {
      const transitions = this._states[this._currentState].on

      if (transitions && transitions[event.type]) {
        const {target, actions} = transitions[event.type]

        if (actions) {
          for (const action of actions) {
            action(this.context, event.payload)
          }
        }

        if (target) {
          this._currentState = target
        }
      }
    }
  }
}
