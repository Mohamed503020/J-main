import { animate, state, style, transition, trigger } from "@angular/animations";

export const toggleFade=trigger('fade',[

  transition('void => *', [style({opacity:0}), animate(2000)]),
  transition('* => void', [animate(1000,style({opacity:0}))])
])