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
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class AddArticleComponent implements OnInit {
  articleForm!: FormGroup;
  userData!: any;
  constructor(
    private formBuilder: FormBuilder,
    private articlesService: ArticlesService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.userData = this.authService.getDecodedToken();

    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      username: [this.userData.username],
      userId: [this.userData.id],
    });
  }

  submit() {
    if (this.articleForm.valid) {
      const token = this.authService.getToken();
      if (token !== null) {
        const response = this.articlesService
          .addArticle(token, this.articleForm.value)
          .subscribe({
            next: (message) => {
              this.toastService.presentToast(message, 'success', 1500, 'top');
              this.articleForm.reset({
                username: this.userData.username,
                userId: this.userData.id,
                title: '',
                author: '',
                description: '',
              });
            },
            error: (error) => {
              console.error(error);
              this.toastService.presentToast(
                `erreur, voudriez-vous réessayer s'il vous plaît. Si l'erreur persiste, essayez de vous reconnecter s'il vous plaît`,
                'danger',
                1500,
                'top'
              );
            },
          });
      } else {
        this.toastService.presentToast(
          `erreur d'autorisation, voudriez-vous vous déconnecter et vous connecter s'il vous plaît`,
          'warning',
          1500,
          'middle'
        );
      }
    } else {
      this.toastService.presentToast(
        "Votre journal n'etait pas ajouté",
        'warning',
        1500,
        'middle'
      );
    }
  }
}
