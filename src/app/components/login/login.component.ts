import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    submitLogin() {
        const userData = this.loginForm.value;

        this.authService.login(userData).subscribe({
            next: () => {
                this.router.navigate(['admin']);
            },
            error: (err) => alert(err.message)
        });
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
        });

        const savedUser = this.authService.autoLogin();
        if (savedUser) {
            this.loginForm.setValue({
                email: savedUser.email,
                password: savedUser.password
            });
        }
    }
}
