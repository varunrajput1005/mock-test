import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../_services/auth';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  isLoading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  async onSubmit() {
    if (this.loginForm.invalid) {
      // this.toastr.warning('Please fill all required fields correctly.');
      return;
    }

    this.isLoading = true;
    const res: any = await this.authService.login(this.loginForm.value)
    const type: string = this.authService.user.userType;
    const loginType: string = this.authService.user.loginType;


    if (loginType == 'Employee') {
      await this.router.navigate(['employee'])
    }
    else if (type == 'SUPER_ADMIN') {
      await this.router.navigate(['super-admin/dashboard']);
    } else if (type == 'ADMIN') {
      await this.router.navigate(['admin/dashboard'])
    } else if (type == 'Employee') {
      await this.router.navigate(['employee/dashboard'])
    }
    // this.http.post<{ token: string; message?: string }>(
    //   'http://localhost:8080/api/auth/login',
    //   this.loginForm.value
    // ).subscribe({
    //   next: (res) => {
    //     this.isLoading = false;
    //     localStorage.setItem('authToken', res.token);
    //     this.toastr.success(res.message || 'Login successful 🎉');
    //     this.router.navigate(['/dashboard']);
    //   },
    //   error: () => {
    //     this.isLoading = false;
    //     // Errors handled automatically by interceptor
    //   }
    // });
  }
}
