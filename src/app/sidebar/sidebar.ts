import { Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [HlmSidebarImports],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class AppSidebar {}
