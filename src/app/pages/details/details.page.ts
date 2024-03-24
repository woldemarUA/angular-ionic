import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Article } from 'src/interfaces/article.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DetailsPage implements OnInit {
  article: Article | undefined;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.article = navigation?.extras?.state?.['article'] as Article;
    if (!this.article) {
      this.article = history.state.article as Article;
    }
  }
}
