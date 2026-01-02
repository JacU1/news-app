import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, Subject, tap} from 'rxjs';
import { API_KEY, API_URL } from 'src/app/core/config/constants';
import { IArticle, INewsApiResponse } from 'src/app/core/models/news-api-model';
@Injectable()
export class NewsApiService {
  
  constructor(private readonly httpClient: HttpClient) { }

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
