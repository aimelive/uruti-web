import { Component } from '@angular/core';
import { MENU_ITEMS } from './menu-items';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuItems: MenuItem[] = MENU_ITEMS;
  logoImagePath: string = '../assets/images/logo.svg';
}
