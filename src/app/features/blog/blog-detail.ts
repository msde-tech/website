import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';

export interface ContentBlock {
  type: 'heading2' | 'heading3' | 'paragraph' | 'list';
  text: string;
  items?: string[];
}

@Component({
  selector: 'app-blog-detail',
  imports: [DatePipe, RouterLink],
  templateUrl: './blog-detail.html',
})
export class BlogDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  protected readonly post = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    return this.content.getBlogPost(slug);
  });

  protected readonly contentBlocks = computed(() => {
    const post = this.post();
    return post ? this.parseContent(post.content) : [];
  });

  protected parseContent(content: string): ContentBlock[] {
    const blocks: ContentBlock[] = [];
    const lines = content.split('\n');
    let currentList: string[] = [];

    for (const line of lines) {
      if (line.startsWith('### ')) {
        if (currentList.length) {
          blocks.push({ type: 'list', text: '', items: [...currentList] });
          currentList = [];
        }
        blocks.push({ type: 'heading3', text: line.slice(4) });
      } else if (line.startsWith('## ')) {
        if (currentList.length) {
          blocks.push({ type: 'list', text: '', items: [...currentList] });
          currentList = [];
        }
        blocks.push({ type: 'heading2', text: line.slice(3) });
      } else if (line.startsWith('- ')) {
        currentList.push(line.slice(2));
      } else if (line.trim() === '') {
        if (currentList.length) {
          blocks.push({ type: 'list', text: '', items: [...currentList] });
          currentList = [];
        }
      } else {
        if (currentList.length) {
          blocks.push({ type: 'list', text: '', items: [...currentList] });
          currentList = [];
        }
        blocks.push({ type: 'paragraph', text: line });
      }
    }
    if (currentList.length) {
      blocks.push({ type: 'list', text: '', items: [...currentList] });
    }
    return blocks;
  }
}
