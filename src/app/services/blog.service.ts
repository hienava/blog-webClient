import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Blog } from '../blObjects/blog';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseService {


  constructor(private httpClient: HttpClient,
  ) { super(); }

  newBlog(blog: Blog) {
    super.createAuthenticationHeaders();
    return this.httpClient.post<Blog>(this.domain + this.postBlogUrl, blog, this.options);
  }

  editBlog(blog: Blog) {
    super.createAuthenticationHeaders();
    return this.httpClient.put(this.domain + this.putBlogUrl, blog, this.options);
  }

  getAllBlogs() {
    super.createAuthenticationHeaders();
    return this.httpClient.get<Blog>(this.domain + this.getAllBlogsUrl, this.options);
  }

  getBlog(id) {
    let params = new HttpParams();
    params = params.append('id', id);
    super.createAuthenticationHeaders();
    return this.httpClient.get<Blog>(this.domain + this.getBlogUrl + params, this.options);
  }

  deleteBlog(id) {
    super.createAuthenticationHeaders();
    return this.httpClient.delete<Blog>(this.domain + this.deleteBlogUrl + id, this.options);
  }

}
