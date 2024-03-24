import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastSerive: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      const { password, username } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);

          this.toastSerive.presentToast(
            'Connexion réussie',
            'success',
            1500,
            'top'
          );
          this.router.navigate(['/articles']);
        },
        error: (error) => {
          this.toastSerive.presentToast(
            error.error.message,
            'danger',
            1500,
            'top'
          );
          // console.error(error.error.message);
        },
      });
    }
  }
}
