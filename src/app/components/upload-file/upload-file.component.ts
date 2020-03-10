import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem} from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  currentUrl;
  constructor(
    private activatedRoute: ActivatedRoute, private autService: AuthService) { }

  title = 'ng8fileupload';
  uriUpload = this.autService.domain + this.autService.postUpload;

  public uploader: FileUploader = new FileUploader({ url: this.uriUpload, itemAlias: 'photo' });

  ngOnInit() {

    this.currentUrl = this.activatedRoute.snapshot.params;
    console.log('blog id', this.currentUrl.id);
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBeforeUploadItem = (file) => { file.file.name = this.currentUrl.id; };
    this.uploader.onCompleteItem = (item: FileItem, response: any, status: any, headers: any) => {
        console.log('ImageUpload:uploaded: item', item);
        alert('File uploaded successfully');
    };
 }

}
