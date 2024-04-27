import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-display-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-books.component.html',
  styleUrl: './display-books.component.css'
})
export class DisplayBooksComponent {
  fullBookInfo: Book[] = [];

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks(){
    const savedBooks = localStorage.getItem('bookList');
    if(savedBooks != null) {
      this.fullBookInfo = JSON.parse(savedBooks);
    }
  }

  public deleteBook(book: Book ) {
      const index = this.fullBookInfo.indexOf(book);
      this.fullBookInfo.splice(index,1);
      localStorage.setItem('bookList', JSON.stringify(this.fullBookInfo))
    }
}
