import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../blObjects/user';


export class BaseService {

    public domain =  environment.domain;
    // User routes
    public postUrl = '/users/register';
    public postLoginUrl = '/user/login/';
    // Blog routes
    public postBlogUrl = '/blogs/create';
    public putBlogUrl = '/blogs';
    public getAllBlogsUrl = '/blogs/';
    public getBlogUrl = '/blogs?';
    public deleteBlogUrl = '/blogs?';
    //Files routes
    public postUpload = '/files/';
    
    public authToken;
    public options;
    private user: User;


    // Function to create headers, add token, to be used in HTTP requests
    createAuthenticationHeaders() {
        this.loadToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authToken
        });
        this.options = { headers };
    }
    // Function to get token from client local storage
    loadToken() {
        this.authToken = localStorage.getItem('token');
    }

    storeUserData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;

    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
      }

      loggedIn() {
        const helper = new JwtHelperService();
        return helper.isTokenExpired(localStorage.getItem('token'));
      }

}
