import { Injectable, signal, computed } from '@angular/core';
import type { BlogPost } from '../models/blog-post';
import type { Project } from '../models/project';
import blogPostsData from '../../../../content/blog/posts.json';
import projectsData from '../../../../content/projects/projects.json';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly blogPosts = signal<BlogPost[]>(blogPostsData as BlogPost[]);
  private readonly projects = signal<Project[]>(projectsData as Project[]);

  readonly allBlogPosts = computed(() =>
    [...this.blogPosts()].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  );

  readonly allProjects = this.projects.asReadonly();

  readonly allTags = computed(() => {
    const tagSet = new Set<string>();
    for (const post of this.blogPosts()) {
      for (const tag of post.tags) {
        tagSet.add(tag);
      }
    }
    return [...tagSet].sort();
  });

  getBlogPost(slug: string): BlogPost | undefined {
    return this.blogPosts().find((p) => p.slug === slug);
  }

  getProject(slug: string): Project | undefined {
    return this.projects().find((p) => p.slug === slug);
  }

  filterBlogPostsByTag(tag: string): BlogPost[] {
    return this.allBlogPosts().filter((p) => p.tags.includes(tag));
  }
}
