import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  template: `
    <form (submit)="onSubmit($event)">
      <label>Author: <input type="text" [(ngModel)]="author" name="author"></label>
      <label>Title: <input type="text" [(ngModel)]="title" name="title"></label>
      <button type="submit">Search</button>
    </form>
  `,
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class SearchComponent {
  @Output() search = new EventEmitter<{ author: string; title: string }>();
  @Output() error = new EventEmitter<string>();

  author = '';
  title = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    this.search.emit({ author: this.author, title: this.title });
  }
}
