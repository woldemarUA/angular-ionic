import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/interfaces/article.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.articlesApi}articles`);
  }

  addArticle(token: string, articleData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http
      .post(`${environment.articlesApi}articles`, articleData, httpOptions)
      .pipe(
        map((response: any) => {
          return response.message;
        })
      );
  }
}
