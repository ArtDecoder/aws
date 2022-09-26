import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  SecurityContext,
  ViewEncapsulation,
} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {BehaviorSubject, catchError, filter, map, merge, Observable, of, switchMap, takeUntil, tap} from 'rxjs'
import {DestroyService, StaticRequestService} from '../../services'

@Component({
  selector: 'aws-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class SvgComponent implements OnInit {
  static readonly INVALID_SVG_STRING = 'invalid svg string'

  @Input()
  set src(src: string) {
    this._src$.next(src)
  }

  private _src$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(
    private readonly _self: ElementRef,
    private readonly _sanitizer: DomSanitizer,
    private readonly _staticRequestService: StaticRequestService,
    private readonly _destroyService: DestroyService,
  ) {
  }

  ngOnInit(): void {
    this.subscribeToSrcChange()
  }

  @HostBinding('class')
  get hostClass(): string[] {
    return ['aws-svg']
  }

  private isExternal(src: string): boolean {
    return src.endsWith('.svg')
  }

  private isSvgString(src: string): boolean {
    return src.startsWith('<svg') && src.endsWith('svg>')
  }

  private get ifExternalSvgFile$(): Observable<string> {
    return this._src$.pipe(
      filter((src) => this.isExternal(src)),
      switchMap((src) => {
        return this._staticRequestService.request(src)
      }),
      catchError((error) => {
        console.error(error.message)
        return of('')
      }),
    )
  }

  private get ifSvgString$(): Observable<string> {
    return this._src$.pipe(filter((src) => this.isSvgString(src)))
  }

  private get ifInvalidSvgString(): Observable<string> {
    return this._src$.pipe(
      filter((src) => !this.isExternal(src) && !this.isSvgString(src)),
      tap(() => {
        console.error(SvgComponent.INVALID_SVG_STRING)
      }),
      map(() => ''),
    )
  }

  private subscribeToSrcChange(): void {
    merge(this.ifExternalSvgFile$, this.ifSvgString$, this.ifInvalidSvgString)
      .pipe(takeUntil(this._destroyService))
      .subscribe((icon) => {
        if (icon) {
          this._self.nativeElement.innerHTML = this._sanitizer.sanitize(
            SecurityContext.HTML,
            this._sanitizer.bypassSecurityTrustHtml(icon),
          )
        }
      })
  }
}
