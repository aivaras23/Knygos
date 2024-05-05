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

    constructor(private booksService: BooksService){}
    
  ngOnInit() {
    this.loadBooks();
  }

  loadBooks(){
    this.booksService.retrieveBooks().subscribe(
      (bookCount: number) => {
        this.bookCount = Object.values(bookCount).length;
        this.loadBooks();
      }
    )
  }
  
}
