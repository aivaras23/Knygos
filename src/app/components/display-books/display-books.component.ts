import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

    public updateBook(book: Book){
      book.editMode = false;
      localStorage.setItem('bookList', JSON.stringify(this.fullBookInfo));
    }

}
