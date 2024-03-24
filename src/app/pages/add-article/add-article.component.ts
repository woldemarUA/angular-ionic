import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/services/toast-service.service';
import { ArticlesService } from 'src/app/services/articles.service';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class AddArticleComponent implements OnInit {
  articleForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private articlesService: ArticlesService,
    private toastSerive: ToastService
  ) {}

  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
}
