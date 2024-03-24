import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JWTService {
  constructor(private jwtHelper: JwtHelperService) {}

  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
}
