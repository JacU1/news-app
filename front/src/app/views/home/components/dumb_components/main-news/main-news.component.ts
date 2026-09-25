import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IArticle} from "../../../../../core/models/news-api-model";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-main-news',
    templateUrl: './main-news.component.html',
    styleUrls: ['./main-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterModule]
})
export class MainNewsComponent implements OnChanges {
  @Input() mainPanelNewsArray : IArticle[] | null = [];
  @Input() isLoading: boolean | null = false;

  public newsItem?: IArticle;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.mainPanelNewsArray);
    if(this.mainPanelNewsArray) {
      this.newsItem = this.mainPanelNewsArray[0];
    }
  }
}
