import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { UiService } from '../../../services/ui.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, FontAwesomeModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  faChevron = faChevronRight;
  // ----------------------------------------------------------------
  categories: string[] = ['Websites', 'Mobile', 'UI/UX'];
  selectedCategory: string = this.categories[0];

  constructor(public uiService: UiService, public sanitizer: DomSanitizer) {}

  onSelectCategory = (category: string) => {
    this.selectedCategory = category;
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
}
