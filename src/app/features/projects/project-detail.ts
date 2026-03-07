import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  protected readonly project = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    return this.content.getProject(slug);
  });
}
