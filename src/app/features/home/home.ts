import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  protected readonly capabilities = [
    {
      icon: '☁️',
      title: 'Cloud Data Platforms',
      description:
        'Design and implementation of data platforms on Azure, Databricks, and Microsoft Fabric. From architecture to production.',
    },
    {
      icon: '🏗️',
      title: 'Data Warehousing',
      description:
        'Dimensional modeling with Kimball methodology. Star schemas, conformed dimensions, and a single source of truth.',
    },
    {
      icon: '⚙️',
      title: 'ETL/ELT Pipelines',
      description:
        'Reliable data pipelines with built-in quality gates, monitoring, and incremental processing. Delta Lake and Spark.',
    },
    {
      icon: '📊',
      title: 'Analytics & BI',
      description:
        'Power BI semantic models, DAX optimization, and self-service analytics for business users.',
    },
    {
      icon: '</>',
      title: 'Backend Engineering',
      description:
        'TypeScript/NestJS and Python/FastAPI backends. Event-driven architectures, APIs, and integrations.',
    },
    {
      icon: '🧭',
      title: 'Architecture & Leadership',
      description:
        'Technical standards, CI/CD pipelines, testing strategies, and roadmap planning. Hands-on tech leadership.',
    },
  ];
}
