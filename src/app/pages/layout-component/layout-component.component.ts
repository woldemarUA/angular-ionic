import { Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  Router,
  NavigationEnd,
  Event as RouterEvent,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast-service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterOutlet, CommonModule],
})
export class LayoutComponent implements OnInit {
  pageTitle: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event: RouterEvent): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.updateTitle(event.url);
      });
  }

  isAuth(): Boolean {
    return this.authService.isLoggedIn();
  }

  async logout(): Promise<void> {
    this.authService.logout();
    await this.toastService
      .presentToast(
        'vous avez été déconnecté avec succès',
        'primary',
        1500,
        'middle',
        true
      )
      .then(() => this.router.navigate(['login']));
  }

  updateTitle(url: string) {
    if (url.startsWith('/articles/detail/')) {
      this.pageTitle = "Détails de l'article";
    } else {
      switch (url) {
        case '/articles':
          this.pageTitle = 'Journal liste';
          break;
        case '/login':
          this.pageTitle = 'Se connecter';
          break;
        case '/register':
          this.pageTitle = `S'inscrire`;
          break;
        default:
          this.pageTitle = 'Vieux journals';
      }
    }
  }
}
