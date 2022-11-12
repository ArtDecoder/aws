import {animate, AnimationBuilder, AnimationPlayer, keyframes, style} from '@angular/animations'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import {awsIconMenuLarge} from '@aws/icons'

@Component({
  selector: 'aws-navbar-toggle',
  templateUrl: './navbar-toggle.component.html',
  styleUrls: ['./navbar-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarToggleComponent implements OnDestroy {

  //================================================================================
  //  Vars
  //================================================================================
  @ViewChild('svg', {read: ElementRef})
  private _svgRef!: ElementRef

  private _isActive = false
  private _player: AnimationPlayer | null = null

  //================================================================================
  //  Constructor
  //================================================================================
  constructor(private readonly _cdr: ChangeDetectorRef,
              private readonly _animationBuilder: AnimationBuilder) {
  }

  //================================================================================
  //  Bindings
  //================================================================================
  @HostBinding('class')
  private get hostClass(): { [key: string]: boolean } {
    return {
      'aws-navbar-toggle': true,
      'aws-navbar-toggle_active': this._isActive,
    }
  }

  //================================================================================
  //  Life Cycle
  //================================================================================
  ngOnDestroy(): void {
    this.destroyPlayer()
  }

  //================================================================================
  //  Getters and Setters
  //================================================================================
  get toggleButtonIcon(): string {
    return awsIconMenuLarge
  }

  set isActive(value: boolean) {
    if (value !== this._isActive) {
      this._isActive = value
      this._cdr.markForCheck()
    }
  }

  //================================================================================
  //  Public
  //================================================================================
  onToggleMouseEnter(): void {
    const player = this.createPlayer()

    player.onDone(() => {
      if (this._player) {
        player.restart()
      }
    })

    this._player = player
    player.play()
  }

  onToggleMouseLeave(): void {
    this.destroyPlayer()
  }

  //================================================================================
  //  Private
  //================================================================================
  private createPlayer(): AnimationPlayer {
    const factory = this._animationBuilder.build(
      animate('1s',
        keyframes([
          style({transform: 'scale(1)', offset: 0}),
          style({transform: 'scale(1.35)', offset: 0.5}),
          style({transform: 'scale(1)', offset: 1}),
        ]),
      ),
    )

    return factory.create(this._svgRef.nativeElement)
  }

  private destroyPlayer(): void {
    if (this._player) {
      this._player.destroy()
      this._player = null
    }
  }
}
