import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Blog } from '../../blObjects/blog';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  message;
  messageClass;
  newPost = false;
  newBlogButton = false;
  loadingBlogs = false;
  form: FormGroup;
  processing = false;
  username;
  blogPosts: any[] = [];
  image;


  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {
    this.createNewBlogForm();
  }

  createNewBlogForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      country: ['', Validators.compose([
        Validators.required
      ])],
      city: ['', Validators.compose([
        Validators.required
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    });

  }


  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true }
    }
  }

  newBlogForm() {
    this.newPost = true;
    this.newBlogButton = false;
  }

  enableNewBlogForm() {
    this.form.get('title').enable();
    this.form.get('country').enable();
    this.form.get('city').enable();
    this.form.get('body').enable();
  }

  disableNewBlogForm() {
    this.form.get('title').disable();
    this.form.get('country').enable();
    this.form.get('city').enable();
    this.form.get('body').disable();
  }

  onBlogSubmit() {
    this.processing = true;
    this.disableNewBlogForm();
    const blog: Blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      country: this.form.get('country').value,
      city: this.form.get('city').value,
      createdBy: this.username
    };
    this.blogService.newBlog(blog).subscribe((data: any) => {
      this.messageClass = 'alert alert-success';
      this.message = 'Blog saved!!';
      this.getAllBlogs();
      setTimeout(() => {
        this.newPost = false;
        this.newBlogButton = true;
        this.processing = false;
        this.message = false;
        this.form.reset();
        this.enableNewBlogForm();
      }, 2000);
    }, (err) => {
      console.log(err);
      this.messageClass = 'alert alert-danger';
      this.message = 'Error saving blog.';
      this.processing = false;
      this.enableNewBlogForm();
    });

  }

  goBack() {
    window.location.reload();
  }

  edit(blogId) {
    this.router.navigate(['/edit-blog', blogId, 'readonly']);
  }

  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe((data: any) => {
      this.blogPosts = data;
    });
  }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
    const user: any = JSON.parse(localStorage.getItem('user'));
    this.username = user.username;
    this.newBlogButton = user.role === 'User' ? false : true;
    this.getAllBlogs();
  }

}
