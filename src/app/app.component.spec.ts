import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PoemListComponent } from './poem-list/poem-list.component';
import { PoemService } from './poem/poem.service';
import { Poem } from './poem/poem';

// Mock PoemService
class MockPoemService {
  async getPoemsByAuthorAndTitle(author: string, title: string): Promise<Poem[]> {
    return [
      { id: 1, title: 'Mock Sonnet 1', author: 'Shakespeare', content: ['Mock line 1', 'Mock line 2'] },
      { id: 2, title: 'Mock Sonnet 2', author: 'Shakespeare', content: ['Mock line 1', 'Mock line 2'] },
    ];
  }

  async getTitlesByAuthor(author: string): Promise<string[]> {
    return ['Mock Poem 1', 'Mock Poem 2'];
  }

  async getAuthors(): Promise<string[]> {
    return ['Shakespeare', 'Emily Dickinson'];
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, PoemListComponent],
      providers: [
        { provide: PoemService, useClass: MockPoemService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Poetry App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Poetry App');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Triggers change detection and renders the template
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1?.textContent).toContain('Poetry App');
  });
});
