export interface IBlog {
  title: string;
  body: string;
  country: string;
  city: string;
  createdBy: string;


}

export class Blog implements IBlog {
  title: string;
  body: string;
  country: string;
  city: string;
  createdBy: string;


  constructor(blog: IBlog) {
      this.title = blog.title;
      this.body = blog.body;
      this.country = blog.country;
      this.city = blog.city;
      this.createdBy = blog.createdBy;

  }
}
