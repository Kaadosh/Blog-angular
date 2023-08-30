import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
      private router: Router,
      private authService: AuthService
  ) {}

  submitRegistration() {
    const userData = this.registrationForm.value;

    localStorage.setItem('user', JSON.stringify(userData));

    this.authService.login(userData).subscribe({
      next: () => {
        this.router.navigate(['admin']);
      },
      error: (err) => alert(err.message)
    });
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
    });

    const savedUser = this.authService.autoLogin();
    if (savedUser) {
      this.registrationForm.setValue({
        email: savedUser.email,
        password: savedUser.password
      });
    }
  }
}
