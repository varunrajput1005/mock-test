import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = false;
  token = ''
  private tokenKey = 'token';

  constructor(private api: ApiService, private router: Router) {
    this.token = localStorage.getItem(this.tokenKey) || ''
  }

  getAuthorizationToken(): string {
    this.token = localStorage.getItem(this.tokenKey) || ''
    return this.token
  }

  setAuthorizationToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.token = token;
  }



  async me() {
    const user = localStorage.getItem('user')
    localStorage.removeItem('page')

    return
      ;
  }
  async load() {
    // this.user = await this.me();

    const data: any = localStorage.getItem('user')
    if (data) {
      this.user = JSON.parse(data)
      if (!this.user) {
        await this.router.navigate(['/home/login'])
      }
    } else {
      // await this.router.navigate(['/auth/login'])

    }

  }
  async login(credentials: any) {
    const { data, token, message }: any = await this.api.post('user/login', credentials);
    const { _id, email, userType, userName, userId, url, adminUserId, loginType } = data

    this.setAuthorizationToken(token);
    this.user = { _id, email, userType, userName, userId, url, adminUserId, loginType };

    localStorage.setItem('user', JSON.stringify(this.user))
    // @ts-ignore
    return { data, message }

  }

  async forgotPassword(credentials: any) {
    const res: any = await this.api.post('forgot_password', credentials);
    return res;
  }

  async resetPassword(credentials: any, token: any) {
    await this.api.post('reset__password/' + token, credentials);
  }

  async logout() {
    await this.api.post('logout', {});
    this.setAuthorizationToken('');
    localStorage.removeItem('user')
    localStorage.removeItem('page')

    this.user = null;
    await this.router.navigate(['/auth/login'])
  }
  private storageKey = 'rememberedUser';

  rememberUser(username: string, password: string) {
    const credentials = { username, password };
    localStorage.setItem(this.storageKey, JSON.stringify(credentials));
  }

  getRememberedUser() {
    const credentials = localStorage.getItem(this.storageKey);
    return credentials ? JSON.parse(credentials) : null;
  }

  clearRememberedUser() {
    localStorage.removeItem(this.storageKey);
  }
}
