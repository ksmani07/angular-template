import { Injectable } from '@angular/core';
import { ToasterService} from 'angular2-toaster';
import {BodyOutputType} from 'angular2-toaster';

@Injectable()
export class FlashService {

  constructor(private toasterService : ToasterService) { }

  toast ;
  newtoast;
  message(type,message) {
    this.toast = {
      type: type,
      body: '<span> '+message+'</span>',
      bodyOutputType: BodyOutputType.TrustedHtml,
      showCloseButton : 'true',
      timeout : 5000
    };
    this.toasterService.pop(this.toast);
  }
  delaymessage(type,message,timeout) {
    this.newtoast = {
      type: type,
      body: '<span> '+message+'</span>',
      bodyOutputType: BodyOutputType.TrustedHtml,
      showCloseButton : 'true',
      timeout : timeout
    };
    this.toasterService.pop(this.newtoast);
  }

}
