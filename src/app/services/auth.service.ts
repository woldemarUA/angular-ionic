import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/interfaces/auth';
import { Observable } from 'rxjs';

import { JWTService } from './jwt-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  constructor(private http: HttpClient, private jwtService: JWTService) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.authAPI}login`, {
      username,
      password,
    });
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getDecodedToken(): any {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;
    return this.jwtService.decodeToken(token);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
