import {animate, AnimationTriggerMetadata, style, transition, trigger} from '@angular/animations'
import {TRANSITION} from '../../constants/animation'

export const BackdropAnimation: AnimationTriggerMetadata = trigger(
  'backdrop', [
    transition(':enter', [
      style({opacity: 0}),
      animate(TRANSITION, style({opacity: 1}))
    ]),

    transition(':leave', [
      style({opacity: 1}),
      animate(TRANSITION, style({opacity: 0}))
    ])
  ]
)
