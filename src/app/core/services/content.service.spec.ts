import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all blog posts sorted by date descending', () => {
    const posts = service.allBlogPosts();
    expect(posts.length).toBeGreaterThan(0);
    for (let i = 1; i < posts.length; i++) {
      const prev = new Date(posts[i - 1]!.date).getTime();
      const curr = new Date(posts[i]!.date).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it('should return all projects', () => {
    const projects = service.allProjects();
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should find a blog post by slug', () => {
    const posts = service.allBlogPosts();
    const firstPost = posts[0]!;
    const found = service.getBlogPost(firstPost.slug);
    expect(found).toBeDefined();
    expect(found!.title).toBe(firstPost.title);
  });

  it('should return undefined for unknown blog post slug', () => {
    expect(service.getBlogPost('non-existent-slug')).toBeUndefined();
  });

  it('should find a project by slug', () => {
    const projects = service.allProjects();
    const firstProject = projects[0]!;
    const found = service.getProject(firstProject.slug);
    expect(found).toBeDefined();
    expect(found!.title).toBe(firstProject.title);
  });

  it('should return all unique tags sorted', () => {
    const tags = service.allTags();
    expect(tags.length).toBeGreaterThan(0);
    for (let i = 1; i < tags.length; i++) {
      expect(tags[i]! >= tags[i - 1]!).toBe(true);
    }
  });

  it('should filter blog posts by tag', () => {
    const tags = service.allTags();
    const firstTag = tags[0]!;
    const filtered = service.filterBlogPostsByTag(firstTag);
    expect(filtered.length).toBeGreaterThan(0);
    for (const post of filtered) {
      expect(post.tags).toContain(firstTag);
    }
  });
});
