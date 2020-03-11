import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/blObjects/blog';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  message;
  messageClass;
  processing = false;
  blog: Blog;
  currentUrl;
  username;
  loading = true;
  readOnly = false;
  isPhotoAlbum = false;
  photoAlbumUrl;
  blogTitle;


  constructor(private location: Location,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private blogService: BlogService,
              private router: Router) { }

  updateBlogSubmit() {
    this.processing = true;
    this.blogService.editBlog(this.blog).subscribe((data: any) => {
      if (!data) {
        this.messageClass = 'alert alert-danger';
        this.message = data.messagge;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = 'Blog saved!!';
        setTimeout(() => {
          this.router.navigate(['/blog']);
        }, 2000);

      }

    });

  }

  goBack() {
    this.location.back();

  }

  viewPhotoAlbum(photoAlbumUrl) {
    console.log(photoAlbumUrl);
    window.open(photoAlbumUrl);
  }

  ngOnInit() {
    const user: any = JSON.parse(localStorage.getItem('user'));
    this.username = user.username;

    this.currentUrl = this.activatedRoute.snapshot.params;
    this.blogService.getBlog(this.currentUrl.id).subscribe((data: any) => {
      if (!data) {
        this.messageClass = 'alert alert-danger';
        this.message = 'Blog not found.';
      } else {
        if (data[0].urlPhotoAlbum !== undefined) {
          this.isPhotoAlbum = true;
          this.photoAlbumUrl = data[0].urlPhotoAlbum;
        }

        if (this.currentUrl.readParam === 'readonly') {
          this.readOnly = true;
        } else {
          this.readOnly = false;
        }
        this.blog = data[0];
        this.loading = false;
      }
    });
  }

}
