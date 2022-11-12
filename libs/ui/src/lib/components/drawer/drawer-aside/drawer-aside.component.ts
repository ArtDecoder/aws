import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core'
import {delay, Observable, Subject} from 'rxjs'
import {DrawerDirectionEnum} from '../interfaces/drawer-direction.enum'
import {AnimationService} from '../services/animation.service'

@Component({
  selector: 'aws-drawer-aside',
  templateUrl: './drawer-aside.component.html',
  styleUrls: ['./drawer-aside.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerAsideComponent implements OnDestroy {

//================================================================================
  //  Vars
  //================================================================================
  private _size = 250
  private _direction: DrawerDirectionEnum = DrawerDirectionEnum.left

  private _animationStart$: Subject<void> = new Subject()
  private _animationDone$: Subject<void> = new Subject()

  //================================================================================
  //  Constructor
  //================================================================================
  constructor(
    private readonly _self: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _animationService: AnimationService,
  ) {
  }

  //================================================================================
  //  Bindings
  //================================================================================
  @HostBinding('style.display')
  private _display = true

  @HostBinding('style.width')
  private get width(): string {
    if (this._direction === DrawerDirectionEnum.left ||
      this._direction === DrawerDirectionEnum.right) {
      return `${this._size}px`
    }
    return '100%'
  }

  @HostBinding('style.height')
  private get height(): string {
    if (this._direction === DrawerDirectionEnum.top ||
      this._direction === DrawerDirectionEnum.bottom) {
      return `${this._size}px`
    }
    return '100%'
  }

  @HostBinding('class')
  private get hostClass(): { [key: string]: boolean } {
    return {
      'aws-drawer-aside': true,
      'aws-drawer-aside_left': this._direction === DrawerDirectionEnum.left,
      'aws-drawer-aside_right': this._direction === DrawerDirectionEnum.right,
      'aws-drawer-aside_top': this._direction === DrawerDirectionEnum.top,
      'aws-drawer-aside_bottom': this._direction === DrawerDirectionEnum.bottom,
    }
  }

  //================================================================================
  //  Life Cycle
  //================================================================================
  ngOnDestroy(): void {
    this._animationStart$.complete()
    this._animationDone$.complete()
  }

  //================================================================================
  //  Getters and Setters
  //================================================================================
  set direction(direction: DrawerDirectionEnum) {
    if (this._direction !== direction) {
      this._direction = direction
      this._cdr.markForCheck()
    }
  }

  set size(size: number) {
    if (this._size !== size) {
      this._size = size
      this._cdr.markForCheck()
    }
  }

  get elementRef(): HTMLElement {
    return this._self.nativeElement
  }

  get animationStart$(): Observable<void> {
    return this._animationStart$.asObservable().pipe(delay(0))
  }

  get animationDone$(): Observable<void> {
    return this._animationDone$.asObservable().pipe(delay(0))
  }

  //================================================================================
  //  Public
  //================================================================================
  playOpenAnimation(): void {
    this._renderer.setStyle(this._self.nativeElement, 'display', 'block')

    const player = this._animationService.createOpenAnimationPlayer(this._self.nativeElement, this._direction)

    player.onStart(() => {
      this._animationStart$.next()
    })

    player.onDone(() => {
      player.destroy()
      this._animationDone$.next()
    })

    player.play()
  }

  playCloseAnimation(): void {
    const player = this._animationService.createCloseAnimationPlayer(this._self.nativeElement, this._direction)

    player.onStart(() => {
      this._animationStart$.next()
    })

    player.onDone(() => {
      this._renderer.removeStyle(this._self.nativeElement, 'transform')
      player.destroy()
      this._renderer.removeStyle(this._self.nativeElement, 'display')
      this._animationDone$.next()
    })

    player.play()
  }

  reset(): void {
    this._renderer.removeStyle(this._self.nativeElement, 'transform')
  }

}
