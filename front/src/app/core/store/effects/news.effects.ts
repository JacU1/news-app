import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, of } from 'rxjs';
import { NewsApiService } from 'src/app/shared/services/news-API/news-api.service';
import { StoreActionsEnum } from '../../models/news.enums';
import * as NewsActions from '../actions/news.action';

@Injectable()
export class NewsEffects {
  constructor(
    private readonly actions$: Actions, 
    private readonly newsService : NewsApiService) { }

  getArticles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NewsActions.LOAD_NEWS),
      mergeMap(() => {
        console.log('effect');
        return this.newsService
          .getEverythingNews('apple')
          .pipe(map((articles) => NewsActions.LOAD_NEWS_SUCCESS({ articles })), catchError(err => {
            return of(NewsActions.LOAD_NEWS_FAIL({ error: err.message }));
          }));
      })
    );
  })
}
