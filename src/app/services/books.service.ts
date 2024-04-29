import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public fullBookInfo: Book[] = [];

  constructor(private http:HttpClient) { }


  private URL = 'https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/books.json'

  public getBooks(book: Book): Observable<any> {
      return this.http.post(this.URL, book)
  }

  public retrieveBooks(): Observable<any> {
    return this.http.get<{[key:string]:Book}>(this.URL);
  } 

  public deleteBook(id:string) {
    return this.http.delete('https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/books/' + id + '.json');
  }

  public updateBook() {
    
  }
}
