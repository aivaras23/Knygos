import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-display-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './display-books.component.html',
  styleUrl: './display-books.component.css'
})
export class DisplayBooksComponent implements OnInit {
  fullBookInfo: Book[] = [];

  constructor(private booksService: BooksService){}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks(){
    
    /* localStorage
    const savedBooks = localStorage.getItem('bookList');
    if(savedBooks != null) {
      this.fullBookInfo = JSON.parse(savedBooks);
    }
    */
   
      // Duomenų gavimas iš firebase
      this.booksService.retrieveBooks().subscribe (
      (books) => {
        this.fullBookInfo = Object.values(books);
        console.log(this.fullBookInfo);
        
      }
    )
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
