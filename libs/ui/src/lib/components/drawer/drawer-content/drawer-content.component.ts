import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Renderer2, ViewEncapsulation} from '@angular/core'
import {DrawerDirectionEnum} from '../interfaces/drawer-direction.enum'
import {AnimationService} from '../services/animation.service'

@Component({
  selector: 'aws-drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContentComponent {

  //================================================================================
  //  Vars
  //================================================================================
  private _asideSize: number | null = null
  private _direction: DrawerDirectionEnum | null = null
  private _isTranslate = false

  //================================================================================
  //  Constructor
  //================================================================================
  constructor(private readonly _self: ElementRef,
              private readonly _renderer: Renderer2,
              private readonly _animationService: AnimationService) {
  }

  //================================================================================
  //  Bindings
  //================================================================================
  @HostBinding('class')
  private get hostClass(): string[] {
    return ['aws-drawer-content']
  }

  @HostBinding('style')
  private get hostStyle(): { [key: string]: string | null } {
    let transform: string | null = null

    if (this._direction && this._asideSize) {
      switch (this._direction) {
        case DrawerDirectionEnum.left:
          transform = `translateX(${this._asideSize}px)`
          break
        case DrawerDirectionEnum.right:
          transform = `translateX(-${this._asideSize}px)`
          break
        case DrawerDirectionEnum.top:
          transform = `translateY(${this._asideSize}px)`
          break
        case DrawerDirectionEnum.bottom:
          transform = `translateY(-${this._asideSize}px)`
          break
      }
    } else {
      transform = null
    }

    return {
      transform,
    }
  }

  //================================================================================
  //  Getters and Setters
  //================================================================================
  set asideSize(asideSize: number) {
    if (asideSize !== this._asideSize) {
      this._asideSize = asideSize
      this._isTranslate = true
    }
  }

  set direction(direction: DrawerDirectionEnum) {
    if (direction !== this._direction) {
      this._direction = direction
      this._isTranslate = true
    }
  }

  //================================================================================
  //  Public
  //================================================================================
  removeTranslateStyle(): void {
    if (this._isTranslate) {
      this._renderer.removeStyle(this._self.nativeElement, 'transform')
      this._asideSize = null
      this._direction = null
      this._isTranslate = false
    }
  }

  playOpenAnimation(): void {
    if (this._asideSize && this._direction) {
      const player = this._animationService.createOpenAnimationPlayer(this._self.nativeElement, this._direction, this._asideSize, true)

      player.onDone(() => {
        this.setTranslateStyle()
        player.destroy()
      })

      player.play()
    }
  }

  playCloseAnimation(): void {
    if (this._asideSize && this._direction) {
      const player = this._animationService.createCloseAnimationPlayer(this._self.nativeElement, this._direction, this._asideSize, true)

      player.onDone(() => {
        this.removeTranslateStyle()
        player.destroy()
      })

      player.play()
    }
  }

  //================================================================================
  //  Private
  //================================================================================
  private setTranslateStyle(): void {
    switch (this._direction) {
      case DrawerDirectionEnum.left:
        this._renderer.setStyle(this._self.nativeElement, 'transform', `translateX(${this._asideSize}px)`)
        break
      case DrawerDirectionEnum.right:
        this._renderer.setStyle(this._self.nativeElement, 'transform', `translateX(-${this._asideSize}px)`)
        break
      case DrawerDirectionEnum.top:
        this._renderer.setStyle(this._self.nativeElement, 'transform', `translateY(${this._asideSize}px)`)
        break
      case DrawerDirectionEnum.bottom:
        this._renderer.setStyle(this._self.nativeElement, 'transform', `translateY(-${this._asideSize}px)`)
        break
    }
    this._isTranslate = true
  }

}
