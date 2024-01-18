import { Component } from '@angular/core';
import { UiService } from '../../../services/ui.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faPhone } from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import {
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { NgFor } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FontAwesomeModule, NgFor],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  constructor(public uiService: UiService, private toast: HotToastService) {}

  mapPhoto = this.uiService.getImagePath('map', 'jpg');

  faPhone = faPhone;
  faBell = faBell;

  socialMedias = [
    { link: '#', icon: faInstagram },
    { link: '#', icon: faTwitter },
    { link: '#', icon: faLinkedinIn },
  ];

  loading = false;

  async sendEmail(e: Event) {
    e.preventDefault();

    try {
      const formElement: HTMLFormElement = e.target as HTMLFormElement;

      this.loading = true;

      await emailjs.sendForm(
        'service_6t9i2yo', // 'YOUR_SERVICE_ID',
        'template_tu843qq', // 'YOUR_TEMPLATE_ID',
        formElement,
        'xYeaBZkDKW6-UMtYu' // 'YOUR_PUBLIC_KEY'
      );
      formElement.reset();
      this.toast.success(
        'Message sent successfully, we are getting back to you very soon!'
      );
    } catch (error: any) {
      this.toast.error(error.text || error.message);
    } finally {
      this.loading = false;
    }
  }
}
