import { Injectable, OnDestroy } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter, map, mergeMap, Observable, Subject, takeUntil } from 'rxjs'
import { AppRouteDataInterface } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class MetaService implements OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>()

  constructor(
    private readonly _titleService: Title,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    this.subscribeToRouterNavigationEndEvent()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }

  private subscribeToRouterNavigationEndEvent(): void {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this._activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild
          return route
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route): Observable<AppRouteDataInterface> => {
          return route.data
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((data) => {
        console.log('NavigationEnd:', data)
        if (data.meta && data.meta.title) {
          this._titleService.setTitle(data.meta.title)
        }
      })
  }
}
