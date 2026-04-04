import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ISliderNews} from "../../core/models/page-carousel.model";
import {IArticle} from "../../core/models/news-api-model";
import { CommonModule } from '@angular/common';
import { MainNewsComponent } from './components/dumb_components/main-news/main-news.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MainNewsComponent]
})
export class HomeComponent implements OnDestroy {
  private readonly _unSubscription$: Subscription = new Subscription();
  public carouselNewsArray: Array<ISliderNews> = [];
  public mainPanelNews: IArticle[] = [];

  public ngOnDestroy(): void {
    this._unSubscription$.unsubscribe();
  }
}
