import {ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'aws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @HostBinding('class')
  get hostClass(): string[] {
    return ['aws-root']
  }
}
