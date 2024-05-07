import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { LoadingComponent } from '../loading/loading.component';
import { delay } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-display-books',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, FooterComponent],
  templateUrl: './display-books.component.html',
  styleUrl: './display-books.component.css'
})
export class DisplayBooksComponent implements OnInit {
  public fullBookInfo: Book[] = [];
  public isLoading: boolean = false;

  constructor(private booksService: BooksService){} // iterpiamas bookService komponentas 

  ngOnInit() { // panaudojamas ngOnInit kai puslapis pasikrauna ir iskvieciamas loadBooks metodas
    this.loadBooks();
  }


  // metodas uzkrauti knygas is duomenu bazes
  loadBooks(){
    this.isLoading = true; // krovimas prasideda cia 
    /* localStorage
    const savedBooks = localStorage.getItem('bookList');
    if(savedBooks != null) {
      this.fullBookInfo = JSON.parse(savedBooks);
    }
    */
   
      this.booksService.retrieveBooks().pipe(
        delay(200)
      ).subscribe (
      (books) => {
        // this.fullBookInfo = Object.values(books);
        for(let x in books){ // ciklas, kad paiimti visa informacija is knygu array
          this.fullBookInfo.push({...books[x], id:x}); // ideti visas knygu array'us i fullBookInfo array, bei ju kiekvieno id
        }
        console.log(this.fullBookInfo)
        this.isLoading = false; // krovimas baigiasi
      }
    )
  }

  // metodas istringi knyga pagal id is duombazes
  public deleteBook(id:string|null) {
    console.log(id);
      if(id!=null){ // patikirnimas ar id nera tuscias
        this.booksService.deleteBook(id).subscribe(()=> {
            this.fullBookInfo = this.fullBookInfo.filter(book => book.id !== id) // panaudojamas filteris, kad ištrinant knyga atsinaujintu sąrašas
        })
      }
    }

  // knygos atnaujimo metodas
  public updateBook(book: Book){
      this.isLoading = true; // krovimas prasideda
      this.booksService.updateBook(book).pipe(
        delay(200)
      )
      // kai atsinaujina informacija, isjungiami editMode ir isLoading parametrai
      .subscribe(()=> {
        book.editMode = false;
        this.isLoading = false;
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