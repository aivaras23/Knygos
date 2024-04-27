import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { DisplayBooksComponent } from './components/display-books/display-books.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddBookComponent, DisplayBooksComponent, HttpClientModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Knygos';
}
