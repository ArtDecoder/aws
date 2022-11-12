import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core'
import {BreakpointEnum, BreakpointService} from '@aws/grid'
import {awsIconMenuLarge} from '@aws/icons'
import {map, Observable} from 'rxjs'
import {NavbarToggleComponent} from './navbar-toggle/navbar-toggle.component'

@Component({
  selector: 'aws-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  //================================================================================
  //  Output
  //================================================================================
  @Output()
  toggleButtonClick: EventEmitter<void> = new EventEmitter<void>()

  //================================================================================
  //  Vars
  //================================================================================
  @ViewChild('smallScreen', {read: TemplateRef, static: true})
  private _smallScreenTemplateRef!: TemplateRef<HTMLElement>

  @ViewChild('largeScreen', {read: TemplateRef, static: true})
  private _largeScreenTemplateRef!: TemplateRef<HTMLElement>

  @ViewChildren(NavbarToggleComponent, {read: NavbarToggleComponent})
  private _toggleRefQl!: QueryList<NavbarToggleComponent>

  //================================================================================
  //  Constructor
  //================================================================================
  constructor(
    private readonly _renderer: Renderer2,
    private readonly _breakpointService: BreakpointService,
  ) {
  }

  //================================================================================
  //  Bindings
  //================================================================================
  @HostBinding('class')
  get hostClass(): string[] {
    return ['aws-navbar']
  }

  //================================================================================
  //  Getters and Setters
  //================================================================================
  get toggleButtonIcon(): string {
    return awsIconMenuLarge
  }

  get template$(): Observable<TemplateRef<HTMLElement>> {
    return this._breakpointService.breakpoint$.pipe(
      map((bp) => {
        return bp === BreakpointEnum.sm || bp === BreakpointEnum.xs
          ? this._smallScreenTemplateRef
          : this._largeScreenTemplateRef
      }),
    )
  }

  set isToggleButtonActive(value: boolean) {
    if (this._toggleRefQl?.first) {
      this._toggleRefQl.first.isActive = value
    }
  }

  //================================================================================
  //  Public
  //================================================================================
  onToggleButtonClick(): void {
    this.toggleButtonClick.emit()
  }

}
