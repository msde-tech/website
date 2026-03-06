import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideX } from '@ng-icons/lucide';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgIconComponent],
  templateUrl: './header.html',
  providers: [provideIcons({ lucideMenu, lucideX })],
})
export class Header {
  protected readonly mobileMenuOpen = signal(false);

  protected toggleMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
