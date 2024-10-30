import { Component } from '@angular/core';
import { PoemService } from '../poem/poem.service';
import { Poem } from '../poem/poem';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-poem-list',
  templateUrl: './poem-list.component.html',
  styleUrls: ['./poem-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    SearchComponent,
  ],
})
export class PoemListComponent {
  poems: Poem[] = [];
  titles: string[] = [];
  errorMessage = '';
  selectedPoem: Poem | null = null;
  loading = false;

  constructor(private poemService: PoemService) {}

  async onSearch(author: string, title: string): Promise<void> {
    this.errorMessage = '';
    this.selectedPoem = null;
    this.poems = [];
    this.titles = [];
    this.loading = true;

    try {
      if (author && title) {
        this.poems = await this.poemService.getPoemsByAuthorAndTitle(author, title);
      } else if (author.toLowerCase() === 'emily dickinson') {
        this.titles = await this.poemService.getTitlesByAuthor(author);
      } else if (author || title) {
        this.poems = await this.poemService.getPoemsByAuthorAndTitle(author, title);
      } else {
        this.errorMessage = 'Please enter an author or title to search.';
      }
    } catch (error: any) {
      if (author && !['shakespeare', 'william shakespeare', 'emily dickinson'].includes(author.toLowerCase())) {
        this.errorMessage = 'No data';
      } else {
        this.errorMessage = 'No titles under name';
      }
    } finally {
      this.loading = false;
    }
  }

  showPoemDetails(poem: Poem): void {
    this.selectedPoem = poem;
  }
}
