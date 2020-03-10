import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../blObjects/user';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: string;
  messageClass: string;
  processing = false;
  previousUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuardService: AuthGuard
  ) {
    this.createForm();
  }


  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });

  }

  disableForm() {
    this.form.controls.username.disable();
    this.form.controls.password.disable();
  }

  enableForm() {
    this.form.controls.username.enable();
    this.form.controls.password.enable();
  }

  onLoginSubmit() {
    this.processing = true;
    this.disableForm();
    const user: User = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };

    this.authService.login(user).subscribe(data => {
      if (!data.user) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = 'Login Succeded';
        console.log('token: ', data.token);
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);

          } else {
            this.router.navigate(['/blog']);
          }
        }, 2000);
      }

    });

  }

  ngOnInit() {

    if (this.authGuardService.redirectUrl) {
      this.messageClass = 'alert alert-danger';
      this.message = 'You must be logged in to view that page';
      this.previousUrl = this.authGuardService.redirectUrl;
      this.authGuardService.redirectUrl = undefined;


    }
  }

}
