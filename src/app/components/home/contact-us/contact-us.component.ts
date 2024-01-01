import { Component } from '@angular/core';
import { UiService } from '../../../services/ui.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faPhone } from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faLinkedin,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FontAwesomeModule, NgFor],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  constructor(public uiService: UiService) {}

  mapPhoto = this.uiService.getImagePath('map', 'jpg');

  faPhone = faPhone;
  faBell = faBell;

  socialMedias = [
    { link: '#', icon: faInstagram },
    { link: '#', icon: faTwitter },
    { link: '#', icon: faLinkedinIn },
  ];
}
