import {Injectable} from '@angular/core'
import {mergeMap, Observable, shareReplay, takeUntil, throwError, timer} from 'rxjs'
import {fromFetch} from 'rxjs/internal/observable/dom/fetch'

@Injectable({
  providedIn: 'root',
})
export class StaticRequestService {
  private readonly _cache = new Map<string, Observable<string>>()

  request(url: string): Observable<string> {
    const cache = this._cache.get(url)
    if (cache) {
      return cache
    }

    const cacheValue = fromFetch(url).pipe(
      mergeMap((response) => {
        if (response.ok) {
          return response.text()
        }
        return throwError(
          () => new Error(`${response.url} ${response.statusText}`),
        )
      }),
      takeUntil(timer(5e3)),
      shareReplay(1),
    )

    this._cache.set(url, cacheValue)

    return cacheValue
  }
}
