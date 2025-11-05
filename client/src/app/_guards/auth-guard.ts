import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = localStorage.getItem('token')
  const user: any = localStorage.getItem('user')
  const { userType, loginType } = JSON.parse(user)
  const requiredUserType = route.data['requiredUserType'] as string;
  const requiredLoginType = route.data['loginType'] as string;
  if (authService) {
    return true
    // if (loginType === requiredLoginType) {
    //   return true
    // } else if (userType === 'IT' || userType === requiredUserType) {
    //   return true;
    // } else {
    //   return false;
    // }

  }
  return false;
};
