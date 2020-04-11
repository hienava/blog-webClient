import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedLanguage = 'es';

  constructor(private spinnerService: NgxSpinnerService,
              private translateService: TranslateService,
              public  authService: AuthService) {
    this.translateService.setDefaultLang(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
  }



  toogleLanguage(lang: string) {
    this.translateService.use(lang);
  }
  ngOnInit() {

  }

  spinner(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();

    }, 5000);


  }
}
