import { Component } from '@angular/core';

interface Service {
  title: string;
  description: string;
  outcomes: string[];
  technologies: string[];
}

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
})
export class Services {
  protected readonly services: Service[] = [
    {
      title: 'Cloud Data Platforms',
      description:
        'Architecture, implementation, and optimization of cloud-based data platforms. Focus on Azure ecosystem including Databricks, Microsoft Fabric, and Azure Data Factory.',
      outcomes: [
        'Production-ready data lakehouse architectures',
        'Governed data mesh with Unity Catalog',
        'Optimized compute costs through cluster policies',
        'Automated infrastructure with Terraform/IaC',
      ],
      technologies: [
        'Azure',
        'Databricks',
        'Microsoft Fabric',
        'Delta Lake',
        'Unity Catalog',
        'Terraform',
        'ADLS Gen2',
      ],
    },
    {
      title: 'Data Warehousing & Dimensional Modeling',
      description:
        'Design and implementation of dimensional data models following Kimball methodology. Building a single source of truth through conformed dimensions and standardized business logic.',
      outcomes: [
        'Star schema models optimized for analytics',
        'Slowly changing dimensions (SCD2) for historical tracking',
        'Conformed dimensions across business processes',
        'Self-service BI foundation',
      ],
      technologies: [
        'SQL',
        'Databricks SQL',
        'Azure SQL',
        'Power BI',
        'DAX',
        'Dimensional Modeling',
      ],
    },
    {
      title: 'ETL/ELT Pipelines & Data Quality',
      description:
        'End-to-end data pipeline development with built-in quality gates and monitoring. From raw ingestion to business-ready datasets using medallion architecture patterns.',
      outcomes: [
        'Reliable incremental data processing',
        'Automated data quality validation at every stage',
        'Pipeline monitoring and alerting',
        'Reduced data latency from batch to near-real-time',
      ],
      technologies: [
        'Apache Spark',
        'Databricks Jobs',
        'Azure Data Factory',
        'Python',
        'Delta Lake',
        'Structured Streaming',
      ],
    },
    {
      title: 'Analytics & Business Intelligence',
      description:
        'Development of semantic models, interactive dashboards, and self-service analytics platforms. Bridging the gap between raw data and business decisions.',
      outcomes: [
        'Optimized Power BI semantic models',
        'Row-level security aligned with org hierarchy',
        'Automated report refresh and distribution',
        'Data literacy enablement for business teams',
      ],
      technologies: [
        'Power BI',
        'DAX',
        'Tabular Models',
        'Excel',
        'Azure Analysis Services',
      ],
    },
    {
      title: 'Backend APIs & Integration',
      description:
        'Design and development of backend services and APIs. Event-driven architectures for data processing, integration platforms, and microservices.',
      outcomes: [
        'Scalable REST and event-driven APIs',
        'Job queue systems with guaranteed delivery',
        'Third-party system integrations',
        'Comprehensive testing and documentation',
      ],
      technologies: [
        'TypeScript',
        'NestJS',
        'Python',
        'FastAPI',
        'Redis',
        'BullMQ',
        'PostgreSQL',
        'Docker',
      ],
    },
    {
      title: 'Architecture & Tech Leadership',
      description:
        'Technical strategy, architecture reviews, and hands-on engineering leadership. Establishing standards, improving developer experience, and shipping reliably.',
      outcomes: [
        'Clear technical roadmaps and architecture decisions',
        'CI/CD pipeline design and implementation',
        'Code review processes and quality standards',
        'Knowledge transfer and team enablement',
      ],
      technologies: [
        'Azure DevOps',
        'GitHub Actions',
        'Git',
        'Terraform',
        'Testing',
        'CI/CD',
      ],
    },
  ];
}
