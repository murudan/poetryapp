import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  template: `<div class="error" *ngIf="message">{{ message }}</div>`,
  styleUrls: ['./error.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ErrorComponent {
  @Input() message: string = '';
}
