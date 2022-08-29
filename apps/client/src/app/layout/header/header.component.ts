import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'aws-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @HostBinding('class')
  get hostClass(): string[] {
    return ['aws-header']
  }
}
