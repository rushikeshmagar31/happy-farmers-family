import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  language: string = this.translateService.currentLang;

  constructor(
    private translateService: TranslateService,

  ) {}
  languageChange() {  
    this.translateService.use(this.language);
  }

}
