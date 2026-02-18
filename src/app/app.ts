import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSidebar } from './sidebar/sidebar';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { Landing } from './landing/landing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppSidebar, HlmSidebarImports, Landing],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('msde_website');
}
