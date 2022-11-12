import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import {MetaService} from '@aws/core'
import {BreakpointEnum, BreakpointService} from '@aws/grid'
import {DestroyService, DrawerComponent} from '@aws/ui'
import {fromEvent, takeUntil} from 'rxjs'
import {NavbarComponent} from './layout/navbar/navbar.component'

@Component({
  selector: 'aws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AppComponent implements AfterViewInit {

  //================================================================================
  //  Vars
  //================================================================================
  @ViewChild(NavbarComponent, {read: NavbarComponent})
  private _navbarRef!: NavbarComponent

  @ViewChild(DrawerComponent, {read: DrawerComponent})
  private _drawerRef!: DrawerComponent

  private _isSmallScreen = false

  //================================================================================
  //  Constructor
  //================================================================================
  constructor(private readonly _metaService: MetaService,
              private readonly _breakpointService: BreakpointService,
              private readonly _destroy$: DestroyService) {
  }

  //================================================================================
  //  Bindings
  //================================================================================
  @HostBinding('class')
  private get hostClass(): string[] {
    return ['aws-root']
  }

  //================================================================================
  //  Life Cycle
  //================================================================================
  ngAfterViewInit(): void {
    this.subscribeToBreakPontChange()
    this.subscribeToKeyboardEvent()
  }

  //================================================================================
  //  Public
  //================================================================================
  onNavbarToggleButtonClick(): void {
    this._drawerRef.toggle()
  }

  onDrawerStartOpen(): void {
    this._navbarRef.isToggleButtonActive = true
  }

  onDrawerStartClose(): void {
    this._navbarRef.isToggleButtonActive = false
  }

  //================================================================================
  //  Private
  //================================================================================
  private subscribeToBreakPontChange(): void {
    this._breakpointService.breakpoint$
      .pipe(takeUntil(this._destroy$))
      .subscribe((bp) => {
        if (bp === BreakpointEnum.sm || bp === BreakpointEnum.xs) {
          this._isSmallScreen = true
        } else {
          this._isSmallScreen = false
          this._drawerRef.close()
        }
      })
  }

  private subscribeToKeyboardEvent(): void {
    fromEvent(document, 'keydown')
      .pipe(takeUntil(this._destroy$))
      .subscribe((event) => {
        if ((event as KeyboardEvent).key === 'Escape' && this._isSmallScreen) {
          this._drawerRef.toggle()
        }
      })
  }

}
