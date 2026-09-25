import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ISliderNews} from 'src/app/core/models/page-carousel.model';

@Component({
    selector: 'app-page-carousel',
    templateUrl: './page-carousel.component.html',
    styleUrls: ['./page-carousel.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class PageCarouselComponent {
  @Input() sliderNews: ISliderNews[]  = [];

}
