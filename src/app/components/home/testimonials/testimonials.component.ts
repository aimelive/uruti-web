import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgStyle, NgFor],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent {
  constructor(public uiService: UiService) {}

  bg = this.uiService.getImagePath('world');
  quote = this.uiService.getIconPath('quote');

  activeIndex: number = 0;
}
