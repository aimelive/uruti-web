import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BrandsComponent } from './brands/brands.component';
import { NgFor, NgStyle } from '@angular/common';
import { UiService } from '../../services/ui.service';
import { ProductsComponent } from './products/products.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    BrandsComponent,
    NgFor,
    NgStyle,
    ProductsComponent,
    TestimonialsComponent,
    ContactUsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public uiService: UiService) {}

  bg = this.uiService.getImagePath('world');

  services = [
    {
      title: 'Websites  & web app',
      description:
        'Developer’s Hub is highly dedicated to provide optimal software solutions capable of high performance. We develop single page static to high performing and secure E-Commerce website',
      icon: this.uiService.getIconPath('interface'),
    },
    {
      title: 'Mobile',
      description:
        'It is crucial to develop mobile-friendly websites because mobile retains the major search share. We pay special attention to website mobile-friendlinessand AMP pages because it matters the most.',
      icon: this.uiService.getIconPath('mobile'),
    },
    {
      title: 'Cloud',
      description:
        'If you are interested to make cloud-based applications then we can give agreat working hand with that. We will assist you develop secure, reliable, and high-performance cloud computing platforms.',
      icon: this.uiService.getIconPath('mobile'),
    },
  ];

  principles = [
    {
      title: 'Innovation',
      description:
        'Our tech hub fosters a culture of fearless innovation, where setbacks are stepping stones, and breakthroughs drive progress.',
      icon: this.uiService.getIconPath('bulb'),
    },
    {
      title: 'Collaboration  space',
      description:
        "We're a hub of dynamic collaboration, where diverse talents come together, valuing open communication and shared learning for collective intelligence.",
      icon: this.uiService.getIconPath('share'),
    },
    {
      title: 'Integrity Nexus:',
      description:
        'Beyond tech, we revolve around an unwavering nexus of integrity, committed to building a technologically advanced future with moral consciousness.',
      icon: this.uiService.getIconPath('together'),
    },
  ];

  graphic = this.uiService.getImagePath('graphic', 'svg');
}
