import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { FormStatus } from './contact.types';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly status = signal<FormStatus>('idle');

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    honeypot: [''], // spam prevention — should remain empty
  });

  protected async onSubmit(): Promise<void> {
    // Honeypot check: bots fill hidden fields, real users don't
    if (this.form.value.honeypot) {
      this.status.set('success');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');

    // TODO: Replace with actual API call in production, e.g.:
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify(this.form.value) })
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      this.status.set('success');
      this.form.reset();
    } catch {
      this.status.set('error');
    }
  }

  protected resetForm(): void {
    this.status.set('idle');
    this.form.reset();
  }
}
