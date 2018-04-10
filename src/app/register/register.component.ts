import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  user: {
    username: String,
    email: String,
    password: String,
    passwordConfirmation: String
  };
  errors: {
    username: String,
    email: String,
    password: String,
    passwordConfirmation: String
  };

  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
    this.errors = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  }

  handleSubmit(): void {
    this.authService.register(this.user)
      .subscribe((res: any) => {
        this.authService.setSession(res.token);
        this.router.navigate(['/']);
      },
      error => {
        this.errors = error.error.errors;
      });
  }

}
