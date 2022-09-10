import {isPlatformBrowser} from '@angular/common'
import {Inject, Injectable, OnDestroy, PLATFORM_ID, StaticProvider} from '@angular/core'
import {BehaviorSubject, distinctUntilChanged, fromEvent, Observable, Subject, takeUntil} from 'rxjs'
import {BreakpointEnum, Breakpoints} from '../dist'

@Injectable({
  providedIn: 'root',
})
export class BreakpointService implements OnDestroy {

  private readonly _breakpoints = Object.entries(Breakpoints)

  private _breakpoint$: BehaviorSubject<BreakpointEnum> = new BehaviorSubject<BreakpointEnum>(BreakpointEnum.lg)
  private _destroy$: Subject<void> = new Subject<void>()

  constructor(@Inject(PLATFORM_ID) private readonly _platformId: StaticProvider[]) {
    this.subscribeToWindowResize()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()

    this._breakpoint$.complete()
  }

  get breakpoint$(): Observable<BreakpointEnum> {
    return this._breakpoint$.asObservable()
      .pipe(
        distinctUntilChanged((a, b) => {
          return a === b
        }),
      )
  }

  private subscribeToWindowResize(): void {
    if (isPlatformBrowser(this._platformId)) {
      fromEvent(window, 'resize')
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          requestAnimationFrame(() => {
            const bp = this.getBreakpointFromWindowSize(window.innerWidth)
            this._breakpoint$.next(bp)
          })
        })
    }
  }

  private getBreakpointFromWindowSize(windowSize: number): BreakpointEnum {
    for (const [key, value] of this._breakpoints) {
      if (windowSize >= value.minWidth &&
        windowSize <= value.maxWidth) {
        return key as BreakpointEnum
      }
    }
    return BreakpointEnum.lg
  }
}
