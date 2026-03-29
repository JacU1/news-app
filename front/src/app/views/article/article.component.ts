import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/core/models/appState.interface';
import { selectedArticle } from 'src/app/core/store';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/core/models/news-api-model';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterModule, CommonModule]
})
export class ArticleComponent implements OnInit {
  public selectedArticle$!: Observable<IArticle>;

  constructor(private readonly _store: Store<AppStateInterface>,
              private readonly _activatedRoute: ActivatedRoute) {
    this.selectedArticle$ = this._store.select(selectedArticle(this._activatedRoute.snapshot.params['title']));
  }

  ngOnInit(): void {
  }

}
