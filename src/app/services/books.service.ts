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


  private URL = 'https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/books'

  public getBooks(book: Book): Observable<any> {
      return this.http.post(`${this.URL}.json`, book)
  }

  public retrieveBooks(): Observable<any> {
    return this.http.get<{[key:string]:Book}>(`${this.URL}.json`);
  } 

  public deleteBook(id:string) { 
    return this.http.delete(`${this.URL}/${id}.json`);
  }

  public updateBook(book: Book) {
    book.editMode = false;
    return this.http.patch(`${this.URL}/${book.id}.json`, book);
  }
}
