import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'aws-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @HostBinding('class')
  get hostClass(): string[] {
    return ['aws-navbar']
  }
}
