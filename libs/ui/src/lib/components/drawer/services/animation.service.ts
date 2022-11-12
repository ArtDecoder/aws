import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  AnimationStyleMetadata,
  keyframes,
  style,
} from '@angular/animations'
import {ElementRef, Injectable} from '@angular/core'
import {TRANSITION} from '../../../constants/animation'
import {DrawerDirectionEnum} from '../interfaces/drawer-direction.enum'

@Injectable()
export class AnimationService {

  constructor(private readonly _animationBuilder: AnimationBuilder) {
  }

  createOpenAnimationPlayer(el: ElementRef,
                            direction: DrawerDirectionEnum,
                            asideSize?: number,
                            isContentDrawer?: boolean,
  ): AnimationPlayer {
    let animationKeyframes: AnimationStyleMetadata[] = []

    switch (direction) {
      case DrawerDirectionEnum.left:
        if (!isContentDrawer) {
          animationKeyframes = [
            style({transform: 'translateX(-100%)', offset: 0}),
            style({transform: `translateX(0)`, offset: 1}),
          ]
        } else {
          animationKeyframes = [
            style({transform: `translateX(0)`, offset: 0}),
            style({transform: `translateX(${asideSize}px)`, offset: 1}),
          ]
        }
        break
      case DrawerDirectionEnum.right:
        if (!isContentDrawer) {
          animationKeyframes = [
            style({transform: 'translateX(100%)', offset: 0}),
            style({transform: 'translateX(0)', offset: 1}),
          ]
        } else {
          animationKeyframes = [
            style({transform: `translateX(0)`, offset: 0}),
            style({transform: `translateX(-${asideSize}px)`, offset: 1}),
          ]
        }
        break
      case DrawerDirectionEnum.top:
        if (!isContentDrawer) {
          animationKeyframes = [
            style({transform: 'translateY(-100%)', offset: 0}),
            style({transform: 'translateY(0)', offset: 1}),
          ]
        } else {
          animationKeyframes = [
            style({transform: `translateY(0)`, offset: 0}),
            style({transform: `translateY(${asideSize}px)`, offset: 1}),
          ]
        }
        break
      case DrawerDirectionEnum.bottom:
        if (!isContentDrawer) {
          animationKeyframes = [
            style({transform: 'translateY(100%)', offset: 0}),
            style({transform: 'translateY(0)', offset: 1}),
          ]
        } else {
          animationKeyframes = [
            style({transform: `translateY(0)`, offset: 0}),
            style({transform: `translateY(-${asideSize}px)`, offset: 1}),
          ]
        }
        break
    }

    const factory = this._animationBuilder.build([
      animate(TRANSITION, keyframes(animationKeyframes)),
    ])

    return factory.create(el)
  }

  createCloseAnimationPlayer(el: ElementRef,
                             direction: DrawerDirectionEnum,
                             asideSize?: number,
                             isContentDrawer?: boolean): AnimationPlayer {
    let animationKeyframes: AnimationStyleMetadata[] = []

    switch (direction) {
      case DrawerDirectionEnum.left:
        if (!isContentDrawer) {
          animationKeyframes = [
            style({transform: `translateX(0)`, offset: 0}),
            style({transform: 'translateX(-100%)', offset: 1}),
          ]
        } else {
          animationKeyframes = [
            style({transform: `translateX(${asideSize}px)`, offset: 0}),
            style({transform: `translateX(0)`, offset: 1}),
          ]
        }
        break
      case DrawerDirectionEnum.right:
        if (!isContentDrawer) {
          animationKeyframes = [
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(100%)', offset: 1}),
          ]
        } else {
          animationKeyframes = [
            style({transform: `translateX(-${asideSize}px)`, offset: 0}),
            style({transform: `translateX(0)`, offset: 1}),
          ]
        }
        break
      case DrawerDirectionEnum.top:
        if (!isContentDrawer) {
          animationKeyframes = [
            style({transform: 'translateY(0)', offset: 0}),
            style({transform: 'translateY(-100%)', offset: 1}),
          ]
        } else {
          animationKeyframes = [
            style({transform: `translateY(${asideSize}px)`, offset: 0}),
            style({transform: `translateY(0)`, offset: 1}),
          ]
        }
        break
      case DrawerDirectionEnum.bottom:
        if (!isContentDrawer) {
          animationKeyframes = [
            style({transform: 'translateY(0)', offset: 0}),
            style({transform: 'translateY(100%)', offset: 1}),
          ]
        } else {
          animationKeyframes = [
            style({transform: `translateY(-${asideSize}px)`, offset: 0}),
            style({transform: `translateY(0)`, offset: 1}),
          ]
        }
        break
    }

    const factory = this._animationBuilder.build([
      animate(TRANSITION, keyframes(animationKeyframes)),
    ])

    return factory.create(el)
  }
}
