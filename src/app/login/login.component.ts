import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  user: {
    email: String,
    password: String
  };
  error: String;

  ngOnInit() {
    this.user = {
      email: '',
      password: ''
    };
  }

  handleSubmit(): void {
    this.authService.login(this.user)
      .subscribe((res: any) => {
        this.authService.setSession(res.token);
        this.router.navigate(['/dashboard']);
      },
      error => this.error = error.error.message);
  }

}
