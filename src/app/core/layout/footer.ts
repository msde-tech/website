import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideExternalLink, lucideLinkedin } from '@ng-icons/lucide';

@Component({
  selector: 'app-footer',
  imports: [NgIconComponent],
  templateUrl: './footer.html',
  providers: [provideIcons({ lucideLinkedin, lucideExternalLink })],
})
export class Footer {
  protected readonly currentYear = new Date().getFullYear();
}
