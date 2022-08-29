import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'aws-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  @HostBinding('class')
  get hostClass(): string[] {
    return ['aws-home-page']
  }

}
