import {Component, HostBinding, OnInit} from '@angular/core'

@Component({
  selector: 'aws-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @HostBinding('class')
  get hostClass(): string[] {
    return ['aws-not-found-page']
  }
}
