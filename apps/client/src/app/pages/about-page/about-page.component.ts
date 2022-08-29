import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'aws-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @HostBinding('class')
  get hostClass(): string[] {
    return ['aws-about-page']
  }
}
