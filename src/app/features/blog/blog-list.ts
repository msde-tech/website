import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-blog-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './blog-list.html',
})
export class BlogList {
  protected readonly content = inject(ContentService);
  protected readonly selectedTag = signal<string | null>(null);

  protected readonly filteredPosts = computed(() => {
    const tag = this.selectedTag();
    return tag ? this.content.filterBlogPostsByTag(tag) : this.content.allBlogPosts();
  });

  protected selectTag(tag: string): void {
    this.selectedTag.set(tag);
  }

  protected clearFilter(): void {
    this.selectedTag.set(null);
  }
}
