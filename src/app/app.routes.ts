import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout-component/layout-component.component';
import { ArticlesPage } from './pages/articles/articles.page';
import { DetailsPage } from './pages/details/details.page';
import { LoginComponent } from './pages/login/login.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // pathMatch: 'full',
    children: [
      { path: '', redirectTo: 'articles', pathMatch: 'full' },
      { path: 'articles', component: ArticlesPage },
      { path: 'articles/detail/:id', component: DetailsPage },
      { path: 'articles/add', component: AddArticleComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
];
