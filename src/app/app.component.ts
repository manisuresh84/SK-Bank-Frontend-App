import { Component } from '@angular/core';
import { RestServerService } from './services/restserver.service';
import { TranslateService } from './translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bankmanagement';

  constructor(private restService: RestServerService, private translate: TranslateService){
  }

  setLang(lang: string) {
    this.translate.use(lang);
  }
}
