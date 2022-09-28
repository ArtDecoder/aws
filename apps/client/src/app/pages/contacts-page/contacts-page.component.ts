import {ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'aws-contacts',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsPageComponent {

  @HostBinding('class')
  private get hostClass(): string[] {
    return ['aws-contacts-page']
  }
}
