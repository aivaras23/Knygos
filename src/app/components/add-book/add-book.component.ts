import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../services/books.service';
import { LoadingComponent } from '../loading/loading.component';
import { delay } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule,CommonModule, LoadingComponent, FooterComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
    public bookName: string|null = null;
    public bookAuthor: string|null = null;
    public bookReleaseDate: string|null = null;
   

    public fullBookInfo: Book[] = []; 

    public errorBookName:string|null = null;
    public errorAuthorName:string|null = null;
    public errorBookRelease:string|null = null;

    public editMode: boolean = false;

    public isLoading: boolean = false;


    constructor(private bookService: BooksService) {} // iterpiamas bookService komponentas 


  /*
      ngOnInit() {
      const savedBooks = localStorage.getItem('bookList');
      if(savedBooks != null) {
        this.fullBookInfo = JSON.parse(savedBooks);
        this.fullBookInfo.forEach(book => book.editMode = false); // Inicijuoti kiekvienai knygai editMode
        // this.bookId = this.fullBookInfo.length + 1;
      }
    }
    */

    // metodas sukurti nauja knyga
    public newBook() {
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
        // duomenu priskirimas pagal book.ts interfeiso struktura
        id: null,
        name: this.bookName,
        author: this.bookAuthor,
        releaseDate: this.bookReleaseDate,
        editMode: this.editMode
      }
        //this.fullBookInfo.push(newBook);

        // localStorage.setItem('bookList',JSON.stringify(this.fullBookInfo));

        this.isLoading = true; // prasideda krovimas
        // iskviesti bookService komponenta idėti duomenys i duomenu baze
        this.bookService.addBook(newBook).pipe(
          delay(200)
        )
        .subscribe(()=> {
          // po issiuntimo, is naujo nustatyti laukelius kaip tuscius.
            this.bookName = '';
            this.bookAuthor = '';
            this.bookReleaseDate = '';
            this.isLoading = false; // baigiasi krovimas
        })

        // this.bookId++;

        this.errorBookName = null;
        this.errorAuthorName = null;
        this.errorBookRelease = null;
      }
    }

}
