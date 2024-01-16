import { Component } from '@angular/core';
import { AboutUsComponent } from './about-us/about-us.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutUsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
