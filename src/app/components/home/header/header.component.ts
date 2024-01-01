import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  lowerImage: string = '../assets/images/lower.png';
  upperImage: string = '../assets/images/upper.png';
}
