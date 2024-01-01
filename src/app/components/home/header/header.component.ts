import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  lowerImage: string = '../assets/images/lower.svg';
  upperImage: string = '../assets/images/upper.svg';
}
