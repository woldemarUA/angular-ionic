import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { Article } from 'src/interfaces/article.interface';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
  ],
})
export class ArticlesPage implements OnInit {
  articles: Article[] = [];
  // public isLoading = true;
  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {}
  goToArticleDetail(articleId: number, articleData: Article) {
    this.router.navigate(['articles/detail', articleId], {
      state: { article: articleData },
    });
  }
  ngOnInit() {
    this.articlesService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: (err) => {
        console.error('failed to fetch journals:  ', err);
      },
    });
  }
}
