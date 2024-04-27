import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
    public bookName: string|null = null;
    public bookAuthor: string|null = null;
    public bookReleaseDate: string|null = null;
    public bookId: number = 1;

    public fullBookInfo: Book[] = []; 

    public errorBookName:string|null = null;
    public errorAuthorName:string|null = null;
    public errorBookRelease:string|null = null;


    ngOnInit() {
      const savedBooks = localStorage.getItem('bookList');
      if(savedBooks != null) {
        this.fullBookInfo = JSON.parse(savedBooks);

        this.bookId = this.fullBookInfo.length + 1;
      }
    }

    public addBook() {

        if(this.bookName === null) {
          this.errorBookName = 'Klaida: neįvestas pavadinimas'
        }
        if(this.bookAuthor === null) {
          this.errorAuthorName = 'Klaida: neįvestas autorius'
        }
        if(this.bookReleaseDate === null) {
          this.errorBookRelease = 'Klaida: neįvesti išleidimo metai'
        }

      if(this.bookName != null && this.bookAuthor != null && this.bookReleaseDate != null){
        const newBook: Book = {
        id: this.bookId,
        name: this.bookName,
        author: this.bookAuthor,
        releaseDate: this.bookReleaseDate
      }
        this.fullBookInfo.push(newBook);

        localStorage.setItem('bookList',JSON.stringify(this.fullBookInfo));

        this.bookId++;

        this.bookName = '';
        this.bookAuthor = '';
        this.bookReleaseDate = '';

        this.errorBookName = null;
        this.errorAuthorName = null;
        this.errorBookRelease = null;
      }
    }

    public deleteBook(book: Book ) {
      const index = this.fullBookInfo.indexOf(book);
      this.fullBookInfo.splice(index,1);
      localStorage.setItem('bookList', JSON.stringify(this.fullBookInfo))
    }

    public updateBook() {
      
    }

}