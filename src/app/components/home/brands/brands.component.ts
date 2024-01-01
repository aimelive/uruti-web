import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgFor],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  constructor(public uiService: UiService) {}

  brands: string[] = [
    this.uiService.getIconPath('pfizer'),
    this.uiService.getIconPath('mufg'),
    this.uiService.getIconPath('mastercard'),
    this.uiService.getIconPath('microsoft'),
  ];
}
