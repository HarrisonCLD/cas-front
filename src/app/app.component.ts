import { Component, inject } from '@angular/core';
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private apiService = inject(ApiService);
  private userService = inject(UserService);
  constructor() {
    this.getJWT();
  }

  getJWT(): void {
    const ipt: HTMLInputElement = document.getElementById(
      'token'
    ) as HTMLInputElement;
    if (!ipt) return;
    const token = ipt.value;
    if (!token) return;
    this.apiService.jwt = token;
    ipt.remove();
    this.apiService.provisionHeaders(
      'Authorization',
      `Bearer ${this.apiService.jwt}`
    );
    this.userService.getProfile().then((res: any) => console.log('res', res));
  }
}
