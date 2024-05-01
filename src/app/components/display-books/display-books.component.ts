import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { LoadingComponent } from '../loading/loading.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-display-books',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './display-books.component.html',
  styleUrl: './display-books.component.css'
})
export class DisplayBooksComponent implements OnInit {
  public fullBookInfo: Book[] = [];
  public isLoading = false;

  constructor(private booksService: BooksService){}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks(){
    this.isLoading = true;
    /* localStorage
    const savedBooks = localStorage.getItem('bookList');
    if(savedBooks != null) {
      this.fullBookInfo = JSON.parse(savedBooks);
    }
    */
   
      // Duomenų gavimas iš firebase
      this.booksService.retrieveBooks().pipe(
        delay(400)
      ).subscribe (
      (books) => {
        // this.fullBookInfo = Object.values(books);

        for(let x in books){
          this.fullBookInfo.push({...books[x], id:x});
        }
        console.log(this.fullBookInfo)
        this.isLoading = false;
      }
    )
  }

  // knygos ištrinimas pagal ID
  public deleteBook(id:string|null) {
    console.log(id);
      if(id!=null){
        this.booksService.deleteBook(id).subscribe(()=> {
            this.fullBookInfo = this.fullBookInfo.filter(book => book.id !== id) // panaudojamas filteris, kad ištrinant knyga atsinaujintu sąrašas
        })
      }

    }

    // knygos atnaujimas 
  public updateBook(book: Book){
      this.booksService.updateBook(book).subscribe(()=> {
        book.editMode = false;
      })
    }

}


/*
     const index = this.fullBookInfo.indexOf(book);
      this.fullBookInfo.splice(index,1);
      localStorage.setItem('bookList', JSON.stringify(this.fullBookInfo))
      */


      /*
            book.editMode = false;
      localStorage.setItem('bookList', JSON.stringify(this.fullBookInfo));
      */