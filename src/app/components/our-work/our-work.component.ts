import { Component, OnInit } from '@angular/core';
import { BrandsComponent } from '../home/brands/brands.component';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { UiService } from '../../services/ui.service';
import { SanityService } from '../../services/sanity.service';

@Component({
  selector: 'app-our-work',
  standalone: true,
  imports: [BrandsComponent, NgFor, NgOptimizedImage, NgIf],
  templateUrl: './our-work.component.html',
})
export class OurWorkComponent implements OnInit {
  categories: string[] = ['All', 'Websites', 'Mobile', 'UI/UX'];
  selectedCategory: string = this.categories[0];
  loading: boolean = false;
  projects: Project[] = [];

  constructor(
    public uiService: UiService,
    private sanityService: SanityService
  ) {}

  figma = this.uiService.getIconPath('figma');
  nodejs = this.uiService.getIconPath('nodejs');
  reactjs = this.uiService.getIconPath('reactjs');

  onSelectCategory = (category: string) => {
    this.selectedCategory = category;
    this.fetchProjects(category == 'All' ? undefined : category.toLowerCase());
  };

  ngOnInit() {
    this.fetchProjects();
  }

  //
  async fetchProjects(category?: string) {
    const query = `*[_type == "project" ${
      category ? `&& category == "${category}"` : ''
    }] {
    title,
    description,
    category,
    tags,
    clientName,
    "imageUrl": image.asset->url,
    techStacksUsed,
    link,
}`;

    this.loading = true;
    this.projects = await this.sanityService.fetch(query);
    this.loading = false;
  }
}
