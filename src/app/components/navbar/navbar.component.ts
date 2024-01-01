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

  handleClickMenu(): void {
    const btn = document.getElementById('menu-btn');
    const nav = document.getElementById('menu');
    if (btn && nav) {
      btn.classList.toggle('open');
      nav.classList.toggle('flex');
      nav.classList.toggle('hidden');
    }
  }
}
