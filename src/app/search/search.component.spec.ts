import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event with author and title on form submit', () => {
    spyOn(component.search, 'emit');

    component.author = 'Shakespeare';
    component.title = 'Sonnet';
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.search.emit).toHaveBeenCalledWith({ author: 'Shakespeare', title: 'Sonnet' });
  });

  it('should emit error event if author or title is missing', () => {
    spyOn(component.error, 'emit');

    component.author = '';
    component.title = 'Sonnet';
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.error.emit).toHaveBeenCalledWith('Author and Title are required.');
  });
});
