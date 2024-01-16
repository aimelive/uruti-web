import { Component } from '@angular/core';
import { UiService } from '../../../services/ui.service';
import { NgFor, NgStyle } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { ContactUsComponent } from '../../home/contact-us/contact-us.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, NgStyle, ContactUsComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  constructor(public uiService: UiService) {}

  urutihub = this.uiService.getImagePath('urutihub', 'jpeg');
  urutihub2 = this.uiService.getImagePath('urutihub2', 'jpeg');

  lowerImage: string = '../assets/images/lower.svg';
  upperImage: string = '../assets/images/upper.svg';

  arrowRight = this.uiService.getIconPath('arrow_right');
  arrowLeft = this.uiService.getIconPath('arrow_left');
  arrowUp = this.uiService.getIconPath('arrow_up');

  bg = this.uiService.getImagePath('world');

  faLinkedIn = faLinkedinIn;
}
