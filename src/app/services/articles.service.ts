import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/interfaces/article.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.articlesApi}articles`);
  }
}
