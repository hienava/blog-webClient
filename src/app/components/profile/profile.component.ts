import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, IUser } from '../../blObjects/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public username;
  public email;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const user: any = JSON.parse(localStorage.getItem('user'));

    this.username = user.username;
    this.email = user.email;
  }
}
