import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/shell').then((m) => m.Shell),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'services',
        loadComponent: () => import('./features/services/services').then((m) => m.Services),
      },
      {
        path: 'blog',
        loadComponent: () => import('./features/blog/blog-list').then((m) => m.BlogList),
      },
      {
        path: 'blog/:slug',
        loadComponent: () => import('./features/blog/blog-detail').then((m) => m.BlogDetail),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/project-list').then((m) => m.ProjectList),
      },
      {
        path: 'projects/:slug',
        loadComponent: () =>
          import('./features/projects/project-detail').then((m) => m.ProjectDetail),
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
