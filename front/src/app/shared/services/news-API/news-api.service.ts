import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, Subject, tap} from 'rxjs';
import { IArticle, INewsApiResponse } from '../../../core/models/news-api-model';
import { API_KEY, API_URL } from '../../../core/config/constants';
@Injectable()
export class NewsApiService {
  
  private readonly httpClient = inject(HttpClient);

  public getEverythingNews(topic: string) : Observable<IArticle[]> {
    return this.httpClient.get<INewsApiResponse>(`${API_URL}everything?q=${topic}&apiKey=${API_KEY}`)
      .pipe(
        map(res => {return res.articles})
      )};

  public getTopheadlinesNews(topic: string): Observable<IArticle[]> {
    return this.httpClient.get<INewsApiResponse>(`${API_URL}top-headlines?q=${topic}&apiKey=${API_KEY}`)
      .pipe(
        map(res => {return res.articles})
      )};

}
