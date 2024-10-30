import { Injectable } from '@angular/core';
import { Poem } from './poem';

@Injectable({
  providedIn: 'root',
})
export class PoemService {
  private baseUrl = 'https://poetrydb.org';

  constructor() {}

  async getPoemsByAuthorAndTitle(author: string, title: string): Promise<Poem[]> {
    let url = `${this.baseUrl}`;
    if (author && title) {
      url += `/author,title/${encodeURIComponent(author)};${encodeURIComponent(title)}`;
    } else if (author) {
      url += `/author/${encodeURIComponent(author)}`;
    } else if (title) {
      url += `/title/${encodeURIComponent(title)}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error Code: ${response.status}\nMessage: ${response.statusText}`);
    const poems: Poem[] = await response.json();
    return poems;
  }

  async getTitlesByAuthor(author: string): Promise<string[]> {
    if (author.toLowerCase() === 'emily dickinson') {
      const url = `${this.baseUrl}/author/${encodeURIComponent(author)}/title`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error Code: ${response.status}\nMessage: ${response.statusText}`);
      
      const data = await response.json();
      return data.map((item: any) => item.title);
    }
    throw new Error("No data available for this author.");
  }

  async getAuthors(): Promise<string[]> {
    const url = `${this.baseUrl}/author`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error Code: ${response.status}\nMessage: ${response.statusText}`);
    return response.json();
  }
}
