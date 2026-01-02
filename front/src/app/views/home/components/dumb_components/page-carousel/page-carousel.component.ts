import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ISliderNews} from 'src/app/core/models/page-carousel.model';

@Component({
  selector: 'app-page-carousel',
  templateUrl: './page-carousel.component.html',
  styleUrls: ['./page-carousel.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageCarouselComponent implements OnChanges{
  @Input() sliderNews: ISliderNews[]  = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.sliderNews);
  }


}
