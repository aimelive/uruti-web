import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { UiService } from '../../../services/ui.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SanityService } from '../../../services/sanity.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, RouterLink, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  faChevron = faChevronRight;
  // ----------------------------------------------------------------
  categories: string[] = ['Websites', 'Mobile', 'UI/UX'];
  selectedCategory: string = this.categories[0];
  loading: boolean = false;
  projects: Project[] = [];

  constructor(
    public uiService: UiService,
    public sanitizer: DomSanitizer,
    private sanityService: SanityService
  ) {}

  onSelectCategory = (category: string) => {
    this.selectedCategory = category;
    this.fetchProjects(this.selectedCategory);
  };

  firstRow = [
    {
      icon: this.uiService.getIconPath('_conversion'),
      title: 'Optimization<br/>That works',
    },
    {
      icon: this.uiService.getIconPath('_schedule'),
      title: 'Executable<br/>Plan',
    },
    {
      icon: this.uiService.getIconPath('_messages'),
      title: 'Real Time<br/>alerts',
    },
  ];
  secondRow = [
    {
      icon: this.uiService.getIconPath('_file_searching'),
      title: '100%<br/>Transparency',
    },
    {
      icon: this.uiService.getIconPath('_team'),
      title: 'Seasoned team<br/>members',
    },
    {
      icon: this.uiService.getIconPath('_leadership'),
      title: 'Funnel<br/>DrivenLeads',
    },
  ];
  //
  ngOnInit() {
    this.fetchProjects(this.selectedCategory);
  }

  //
  async fetchProjects(category: string) {
    const query = `*[_type == "project" && category == "${category.toLowerCase()}"] {
    title,
    tags,
    "imageUrl": image.asset->url,
    link,
}`;

    this.loading = true;
    this.projects = await this.sanityService.fetch(query);
    this.loading = false;
  }
}
