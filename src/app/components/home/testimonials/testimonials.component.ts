import { NgFor, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UiService } from '../../../services/ui.service';
import { SanityService } from '../../../services/sanity.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgStyle, NgFor],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent implements OnInit {
  constructor(
    public uiService: UiService,
    private sanityService: SanityService
  ) {}

  bg = this.uiService.getImagePath('world');
  quote = this.uiService.getIconPath('quote');

  activeIndex: number = 0;

  testimonials: Testimonial[] = [];

  async ngOnInit() {
    const query = `*[_type == "testimonial"] {
    title,
    name,
    "imageUrl": imageUrl.asset->url,
    testimony,
}`;
    this.testimonials = await this.sanityService.fetch(query);
  }
}
