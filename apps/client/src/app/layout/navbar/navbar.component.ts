import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core'
import {BreakpointEnum, BreakpointService} from '@aws/grid'
import {awsIconMenuLarge} from '@aws/icons'
import {map, Observable} from 'rxjs'

@Component({
  selector: 'aws-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  @Input()
  set toggleButtonAreaLabel(value: string) {
    if (value && this._toggleButtonQl.first) {
      this._renderer.setAttribute(
        this._toggleButtonQl.first.nativeElement,
        'area-label',
        value,
      )
    }
  }

  @Output()
  toggleButtonClick: EventEmitter<void> = new EventEmitter<void>()

  @ViewChildren('toggleButton', {read: ElementRef})
  private _toggleButtonQl!: QueryList<ElementRef>

  constructor(private readonly _renderer: Renderer2,
              private readonly _breakpointService: BreakpointService) {
  }

  @HostBinding('class')
  get hostClass(): string[] {
    return ['aws-navbar']
  }

  get toggleButtonIcon(): string {
    return awsIconMenuLarge
  }

  get isSmallScreen$(): Observable<boolean> {
    return this._breakpointService.breakpoint$
      .pipe(
        map(bp => {
          return bp === BreakpointEnum.sm || bp === BreakpointEnum.xs
        }),
      )
  }

  onToggleButtonClick(): void {
    this.toggleButtonClick.emit()
  }

}
