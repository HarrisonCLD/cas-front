import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export const isAdminGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (!userService.currentUser.isAdmin) {
    console.log('user', userService);
    router.navigate(['/']);
  }
  return true;
};
