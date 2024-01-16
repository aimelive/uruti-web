import { Component } from '@angular/core';
import { BrandsComponent } from '../home/brands/brands.component';
import { NgFor } from '@angular/common';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-our-work',
  standalone: true,
  imports: [BrandsComponent, NgFor],
  templateUrl: './our-work.component.html',
})
export class OurWorkComponent {
  categories: string[] = ['All', 'Websites', 'Mobile', 'UI/UX'];
  selectedCategory: string = this.categories[0];

  constructor(public uiService: UiService) {}

  figma = this.uiService.getIconPath('figma');
  nodejs = this.uiService.getIconPath('nodejs');
  reactjs = this.uiService.getIconPath('reactjs');

  onSelectCategory = (category: string) => {
    this.selectedCategory = category;
  };
}
