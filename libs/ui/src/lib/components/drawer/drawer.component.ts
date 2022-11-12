import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core'
import {BehaviorSubject, distinctUntilChanged, fromEvent, Observable, Subject, takeUntil} from 'rxjs'
import {DestroyService, StateMachineService} from '../../services'
import {BackdropAnimation} from './backdrop.animation'
import {DrawerAsideComponent} from './drawer-aside/drawer-aside.component'
import {DrawerContentComponent} from './drawer-content/drawer-content.component'
import {DrawerDirectionEnum} from './interfaces/drawer-direction.enum'
import {DrawerModeEnum} from './interfaces/drawer-mode.enum'
import {InputValueInterface} from './interfaces/input-value.interface'
import {StateMachineEventEnum} from './interfaces/state-machine-event.enum'

@Component({
  selector: 'aws-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StateMachineService, DestroyService],
  animations: [BackdropAnimation],
})
export class DrawerComponent implements OnDestroy {

  //================================================================================
  //  Input
  //================================================================================
  @Input()
  set asideSize(asideSize: number | null) {
    if (asideSize !== null && asideSize >= 0 && asideSize !== this._asideSize) {
      this._stateMachine.dispatch({
        type: StateMachineEventEnum.INPUT_CHANGE,
        payload: {asideSize},
      })
    }
  }

  @Input()
  set direction(direction: DrawerDirectionEnum | null) {
    if (direction !== null && direction !== this._direction) {
      this._stateMachine.dispatch({
        type: StateMachineEventEnum.INPUT_CHANGE,
        payload: {direction},
      })
    }
  }

  @Input()
  set mode(mode: DrawerModeEnum | null) {
    if (mode !== null && mode !== this._mode) {
      this._stateMachine.dispatch({
        type: StateMachineEventEnum.INPUT_CHANGE,
        payload: {mode},
      })
    }
  }

  @Input()
  set backdrop(backdrop: boolean | null) {
    if (backdrop !== null && backdrop !== this._backdrop) {
      this._stateMachine.dispatch({
        type: StateMachineEventEnum.INPUT_CHANGE,
        payload: {backdrop},
      })
    }
  }

  @Input()
  set autoClose(autoClose: boolean | null) {
    if (autoClose !== null && autoClose !== this._autoClose) {
      this._stateMachine.dispatch({
        type: StateMachineEventEnum.INPUT_CHANGE,
        payload: {autoClose},
      })
    }
  }

  //================================================================================
  //  Output
  //================================================================================
  @Output()
  startOpen: EventEmitter<void> = new EventEmitter<void>()

  @Output()
  opened: EventEmitter<void> = new EventEmitter<void>()

  @Output()
  startClose: EventEmitter<void> = new EventEmitter<void>()

  @Output()
  closed: EventEmitter<void> = new EventEmitter<void>()

  //================================================================================
  //  Vars
  //================================================================================
  @ViewChildren('backdrop', {read: ElementRef})
  private _backdropRefQl!: QueryList<ElementRef>

  @ContentChildren(DrawerAsideComponent, {read: DrawerAsideComponent})
  private _asideRefQl!: QueryList<DrawerAsideComponent>

  @ContentChildren(DrawerContentComponent, {read: DrawerContentComponent})
  private _contentRefQl!: QueryList<DrawerContentComponent>

  private _asideSize = 250
  private _direction = DrawerDirectionEnum.left
  private _mode = DrawerModeEnum.push
  private _backdrop = false
  private _autoClose = false
  private _isSubscribedToAsideOutsideClick = false

  private _hasBackdrop$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private _unsubscribeFromAnimationEvents$: Subject<void> = new Subject<void>()
  private _unsubscribeFromAsideOutsideClick$: Subject<void> = new Subject<void>()

  //================================================================================
  //  Constructor
  //================================================================================
  constructor(
    private readonly _renderer: Renderer2,
    private readonly _stateMachine: StateMachineService<null>,
    private readonly _destroy$: DestroyService,
  ) {
    this.initStateMachine()
  }

  //================================================================================
  //  Life Cycle
  //================================================================================
  ngOnDestroy(): void {
    this._unsubscribeFromAnimationEvents$.next()
    this._unsubscribeFromAnimationEvents$.complete()

    this._unsubscribeFromAsideOutsideClick$.next()
    this._unsubscribeFromAsideOutsideClick$.complete()
  }

  //================================================================================
  //  Bindings
  //================================================================================
  @HostBinding('class')
  private get hostClass(): string[] {
    return ['aws-drawer']
  }

  //================================================================================
  //  Setters and Getters
  //================================================================================
  get hasBackdrop$(): Observable<boolean> {
    return this._hasBackdrop$.asObservable().pipe(distinctUntilChanged())
  }

  //================================================================================
  //  Public
  //================================================================================
  open(): void {
    this._stateMachine.dispatch({type: StateMachineEventEnum.OPEN})
  }

  close(): void {
    this._stateMachine.dispatch({type: StateMachineEventEnum.CLOSE})
  }

  toggle(): void {
    this._stateMachine.dispatch({type: StateMachineEventEnum.TOGGLE})
  }

  //================================================================================
  //  Private
  //================================================================================
  private initStateMachine(): void {
    this._stateMachine.init({
      initialState: 'CLOSED',
      states: {
        CLOSED: {
          on: {
            INPUT_CHANGE: {
              actions: [this.smUpdateValue],
            },
            OPEN: {
              target: 'OPENING',
              actions: [
                this.smSubscribeToAnimationEvents,
                this.smSubscribeToAsideOutsideClick,
                this.smUpdateAside,
                this.smUpdateContent,
                this.smUpdateBackdrop,
                this.smOpen,
              ],
            },
            TOGGLE: {
              target: 'OPENING',
              actions: [
                this.smSubscribeToAnimationEvents,
                this.smSubscribeToAsideOutsideClick,
                this.smUpdateAside,
                this.smUpdateContent,
                this.smUpdateBackdrop,
                this.smOpen,
              ],
            },
          },
        },
        OPENING: {
          on: {
            INPUT_CHANGE: {
              actions: [this.smUpdateValue],
            },
            ANIMATION_START: {
              actions: [this.smEmitStartOpen],
            },
            ANIMATION_DONE: {
              target: 'OPENED',
              actions: [
                this.smUpdateAside,
                this.smUpdateContent,
                this.smUpdateBackdrop,
                this.smSubscribeToAsideOutsideClick,
                this.smEmitOpened,
              ],
            },
          },
        },
        OPENED: {
          on: {
            INPUT_CHANGE: {
              actions: [
                this.smUpdateValue,
                this.smUpdateAside,
                this.smUpdateContent,
                this.smUpdateBackdrop,
                this.smSubscribeToAsideOutsideClick,
              ],
            },
            CLOSE: {
              target: 'CLOSING',
              actions: [this.smClose],
            },
            TOGGLE: {
              target: 'CLOSING',
              actions: [this.smClose],
            },
          },
        },
        CLOSING: {
          on: {
            INPUT_CHANGE: {
              actions: [this.smUpdateValue],
            },
            ANIMATION_START: {
              actions: [
                this.smHideBackdrop,
                this.smUnsubscribeFromAsideOutsideClick,
                this.smEmitStartClose,
              ],
            },
            ANIMATION_DONE: {
              target: 'CLOSED',
              actions: [
                this.smUnsubscribeFromAnimationEvents,
                this.smHideBackdrop,
                this.smEmitClosed,
              ],
            },
          },
        },
      },
    })
  }

  //================================================================================
  //  State Machine Calls
  //================================================================================
  private smSubscribeToAnimationEvents = () => {
    const aside = this._asideRefQl.first

    aside.animationStart$
      .pipe(takeUntil(this._unsubscribeFromAnimationEvents$))
      .subscribe(() => {
        this._stateMachine.dispatch({type: StateMachineEventEnum.ANIMATION_START})
      })

    aside.animationDone$
      .pipe(takeUntil(this._unsubscribeFromAnimationEvents$))
      .subscribe(() => {
        this._stateMachine.dispatch({type: StateMachineEventEnum.ANIMATION_DONE})
      })
  }

  private smUnsubscribeFromAnimationEvents = () => {
    this._unsubscribeFromAnimationEvents$.next()
  }

  private smOpen = () => {
    switch (this._mode) {
      case DrawerModeEnum.push:
        this._asideRefQl.first.playOpenAnimation()
        this._contentRefQl.first.playOpenAnimation()
        break
      case DrawerModeEnum.over:
        this._asideRefQl.first.playOpenAnimation()
        break
    }
  }

  private smClose = () => {
    switch (this._mode) {
      case DrawerModeEnum.push:
        this._asideRefQl.first.playCloseAnimation()
        this._contentRefQl.first.playCloseAnimation()
        break
      case DrawerModeEnum.over:
        this._asideRefQl.first.playCloseAnimation()
        break
    }
  }

  private smUpdateValue = (context?: null, payload?: unknown) => {
    if (payload && typeof payload === 'object') {
      const {asideSize, autoClose, backdrop, direction, mode} = payload as InputValueInterface

      if (asideSize !== undefined) {
        this._asideSize = asideSize
      }
      if (autoClose !== undefined) {
        this._autoClose = autoClose
      }
      if (direction !== undefined) {
        this._direction = direction
      }
      if (mode !== undefined) {
        this._mode = mode
      }
      if (backdrop !== undefined) {
        this._backdrop = backdrop
      }
    }
  }

  private smUpdateAside = () => {
    const aside = this._asideRefQl.first

    aside.size = this._asideSize
    aside.direction = this._direction
  }

  private smUpdateContent = () => {
    if (this._mode === DrawerModeEnum.push) {
      const content = this._contentRefQl.first

      content.asideSize = this._asideSize
      content.direction = this._direction
    } else {
      this._contentRefQl.first.removeTranslateStyle()
    }
  }

  private smUpdateBackdrop = () => {
    if (this._backdrop) {
      this._hasBackdrop$.next(true)
    } else {
      this._hasBackdrop$.next(false)
    }
  }

  private smHideBackdrop = () => {
    this._hasBackdrop$.next(false)
  }

  private smSubscribeToAsideOutsideClick = () => {
    if (this._autoClose && !this._isSubscribedToAsideOutsideClick) {
      this._isSubscribedToAsideOutsideClick = true

      fromEvent(document, 'click')
        .pipe(takeUntil(this._unsubscribeFromAsideOutsideClick$))
        .subscribe((event: Event) => {
          if (!this._asideRefQl.first.elementRef.contains(event.target as Node)) {
            this.close()
          }
        })
    }
    if (!this._autoClose && this._isSubscribedToAsideOutsideClick) {
      this._isSubscribedToAsideOutsideClick = false
      this._unsubscribeFromAsideOutsideClick$.next()
    }
  }

  private smUnsubscribeFromAsideOutsideClick = () => {
    this._isSubscribedToAsideOutsideClick = false
    this._unsubscribeFromAsideOutsideClick$.next()
  }

  private smEmitStartOpen = () => {
    this.startOpen.emit()
  }

  private smEmitOpened = () => {
    this.opened.emit()
  }

  private smEmitStartClose = () => {
    this.startClose.emit()
  }

  private smEmitClosed = () => {
    this.closed.emit()
  }

}
