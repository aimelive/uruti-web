import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronRight,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { MENU_ITEMS } from '../navbar/menu-items';
import { NgFor, NgIf } from '@angular/common';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

type FooterItem = {
  item: string;
  subItems: SubItem[];
};

type SubItem = {
  text: string;
  icon?: any;
  link?: string;
};

type FooterItems = FooterItem[];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, NgFor, RouterLink, NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  logoImagePath: string = '../assets/images/logo.svg';
  faLocationIcon = faLocationDot;
  faClock = faClock;
  faChevronRight = faChevronRight;

  menuItems: MenuItem[] = MENU_ITEMS;

  FOOTER_ITEMS: FooterItems = [
    {
      item: 'SERVICES',
      subItems: [
        { text: 'Front end Development' },
        { text: 'Back end Development' },
        { text: 'Mobile apps Development' },
        { text: 'Game Development' },
        { text: 'UI/UX Development' },
      ],
    },
    {
      item: 'INDUSTRIES',
      subItems: [
        { text: 'Fin Tech' },
        { text: 'Health Tech' },
        { text: 'E-Commerce' },
        { text: 'Real Estate' },
        { text: 'Marketing and ADTech' },
      ],
    },
    {
      item: 'TECHNOLOGIES',
      subItems: [
        { text: 'React & Angular' },
        { text: 'Node Js' },
        { text: 'Flutter' },
        { text: 'Python' },
        { text: 'PHP / My SQL' },
        { text: '.Net' },
        { text: 'Java' },
      ],
    },
    {
      item: 'CONNECT WITH US',
      subItems: [
        {
          text: 'Instagram',
          icon: faInstagram,
          link: 'https://www.instagram.com/uruti_hub',
        },
        {
          text: 'LinkedIn',
          icon: faLinkedin,
          link: 'https://www.linkedin.com/company/uruti-hub',
        },
      ],
    },
  ];

  FOOTER_CONTACTS = [
    { icon: this.faLocationIcon, text: 'KK 456 st, Gikondo - Kicukiro' },
    { icon: this.faClock, text: 'Open 9AM to 17 PM' },
    { icon: faEnvelope, text: 'info@urutihub.com' },
    { icon: faPhone, text: 'Tel: +250 793 634 993' },
  ];
}
