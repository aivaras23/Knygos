import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
    public bookCount: number = 0; 

    constructor(private booksService: BooksService){} // iterpiamas bookService komponentas 
    
  ngOnInit() {
    this.loadBooks(); // iskviesti metoda su ngOnInit, kai loadBooks komponentas bus inicijuotas
  }

  loadBooks(){
    // iskvieciamas service ir jo metodas
    this.booksService.retrieveBooks().subscribe(
      (bookCount: number) => {
        this.bookCount = Object.values(bookCount).length;
        this.loadBooks(); // iskviesti metoda, kad atsinaujintu sarasas(po istrinimo arba pridejimo)
      }
    )
  }
  
}
