import { Component } from '@angular/core';
import { PoemListComponent } from './poem-list/poem-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [PoemListComponent], 
})
export class AppComponent {
  title = 'Poetry App';
}
