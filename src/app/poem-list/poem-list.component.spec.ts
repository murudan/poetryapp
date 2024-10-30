import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoemListComponent } from './poem-list.component';
import { PoemService } from '../poem/poem.service';
import { Poem } from '../poem/poem';
import { ErrorComponent } from '../error/error.component';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';

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

describe('PoemListComponent', () => {
  let component: PoemListComponent;
  let fixture: ComponentFixture<PoemListComponent>;
  let poemService: PoemService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PoemListComponent,
        ErrorComponent,
        SearchComponent,
      ],
      providers: [
        { provide: PoemService, useClass: MockPoemService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PoemListComponent);
    component = fixture.componentInstance;
    poemService = TestBed.inject(PoemService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch poems by author and title on search', async () => {
    await component.onSearch('Shakespeare', 'Sonnet');
    fixture.detectChanges();

    expect(component.poems.length).toBe(2);
    expect(component.poems[0].title).toBe('Mock Sonnet 1');
    expect(component.errorMessage).toBe('');
    expect(component.loading).toBeFalse();
  });

  it('should display error message if no data is found', async () => {
    spyOn(poemService, 'getPoemsByAuthorAndTitle').and.rejectWith(new Error('No data'));
    await component.onSearch('Unknown Author', 'Unknown Title');
    fixture.detectChanges();

    expect(component.poems.length).toBe(0);
    expect(component.errorMessage).toBe('No data');
    expect(component.loading).toBeFalse();
  });
});
