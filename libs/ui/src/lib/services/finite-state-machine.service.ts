import { Injectable } from '@angular/core'

export interface FiniteStateMachineTransitionInterface<STATE, SIGNAL> {
  fromState: STATE
  signal: SIGNAL
  toState: STATE
  cb?: (...args: unknown[]) => void
}

@Injectable()
export class FiniteStateMachineService<STATE, SIGNAL> {
  private _currentState: STATE | null = null
  private _transitions:
    | FiniteStateMachineTransitionInterface<STATE, SIGNAL>[]
    | null = null

  init(
    initState: STATE,
    transitions: FiniteStateMachineTransitionInterface<STATE, SIGNAL>[] = []
  ) {
    this._currentState = initState
    this._transitions = transitions
  }

  get state(): STATE | null {
    return this._currentState
  }

  dispatch(signal: SIGNAL): void {
    if (this._transitions) {
      const transition = this._transitions.find((t) => {
        return t.fromState === this._currentState && signal === t.signal
      })

      if (transition) {
        this._currentState = transition.toState

        if (transition.cb) {
          transition.cb()
        }
      }
    }
  }
}
