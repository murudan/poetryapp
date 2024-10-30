import { TestBed } from '@angular/core/testing';
import { PoemService } from './poem.service';
import { Poem } from './poem';

describe('PoemService', () => {
  let service: PoemService;

  const mockPoems: Poem[] = [
    { id: 1, title: 'Sonnet 1', author: 'Shakespeare', content: ['Line 1', 'Line 2'] },
    { id: 2, title: 'Sonnet 2', author: 'Shakespeare', content: ['Line 1', 'Line 2'] },
  ];

  const mockAuthors: string[] = ['Shakespeare', 'Emily Dickinson'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoemService],
    });
    service = TestBed.inject(PoemService);
  });

  afterEach(() => {
    (global.fetch as jasmine.Spy).and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch poems by author and title', async () => {
    spyOn(global, 'fetch').and.callFake(
      (input: string | Request | URL, init?: RequestInit): Promise<Response> => {
        const urlString = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
        if (urlString === 'https://poetrydb.org/author,title/Shakespeare;Sonnet') {
          return Promise.resolve(
            new Response(JSON.stringify(mockPoems), {
              status: 200,
              statusText: 'OK',
              headers: { 'Content-Type': 'application/json' },
            })
          );
        }
        return Promise.resolve(
          new Response('Not Found', {
            status: 404,
            statusText: 'Not Found',
          })
        );
      }
    );

    const poems = await service.getPoemsByAuthorAndTitle('Shakespeare', 'Sonnet');
    expect(poems.length).toBe(2);
    expect(poems).toEqual(mockPoems);
  });

  it('should fetch titles by Emily Dickinson', async () => {
    const mockTitles: string[] = ['Poem 1', 'Poem 2'];
    
    spyOn(global, 'fetch').and.callFake(
      (input: string | Request | URL, init?: RequestInit): Promise<Response> => {
        const urlString = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
        if (urlString === 'https://poetrydb.org/author/Emily%20Dickinson/title') {
          return Promise.resolve(
            new Response(JSON.stringify(mockTitles), {
              status: 200,
              statusText: 'OK',
              headers: { 'Content-Type': 'application/json' },
            })
          );
        }
        return Promise.resolve(
          new Response('Not Found', {
            status: 404,
            statusText: 'Not Found',
          })
        );
      }
    );

    const titles = await service.getTitlesByAuthor('Emily Dickinson');
    expect(titles.length).toBe(2);
    expect(titles).toEqual(mockTitles);
  });

  it('should fetch all authors', async () => {
    spyOn(global, 'fetch').and.callFake(
      (input: string | Request | URL, init?: RequestInit): Promise<Response> => {
        const urlString = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
        if (urlString === 'https://poetrydb.org/author') {
          return Promise.resolve(
            new Response(JSON.stringify(mockAuthors), {
              status: 200,
              statusText: 'OK',
              headers: { 'Content-Type': 'application/json' },
            })
          );
        }
        return Promise.resolve(
          new Response('Not Found', {
            status: 404,
            statusText: 'Not Found',
          })
        );
      }
    );

    const authors = await service.getAuthors();
    expect(authors.length).toBe(2);
    expect(authors).toEqual(mockAuthors);
  });
});
