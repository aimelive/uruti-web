import { Component } from '@angular/core';
import { MENU_ITEMS } from './menu-items';
import { NgFor } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { UiService } from '../../services/ui.service';

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

  constructor(route: Router, router: ActivatedRoute, uiService: UiService) {
    route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    router.fragment.subscribe((fragment) => {
      if (fragment) {
        uiService.gotoSection(fragment);
      }
    });
  }

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
