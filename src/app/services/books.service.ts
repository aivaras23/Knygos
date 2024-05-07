import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public fullBookInfo: Book[] = []; // Masyvas, kuris laiko visos knygos informacija, bei paiimamas ir importuojamas book.ts interfeisas

  constructor(private http:HttpClient) { } // httpclient ivedimas uzklausoms


  private URL = 'https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/books' // databazes URL

  // metodas ideti knyga i duombaze
  public addBook(book: Book): Observable<any> {
      return this.http.post(`${this.URL}.json`, book)
      // siunciama POST uzklausa i DB URL
  }

  // metodas gauti knygas 
  public retrieveBooks(): Observable<any> {
    return this.http.get<{[key:string]:Book}>(`${this.URL}.json`);
    // siunciama GET uzklausa, paiimant knygas kaip objekta pagal kiekvienos knygos key(id)
  } 

  // metodas istrinti knyga
  public deleteBook(id:string) { 
    return this.http.delete(`${this.URL}/${id}.json`);
    // siunciama DELETE uzklausa, istrinant knyga pagal id is duombazes
  }

  // metodas atnaujinti knyga
  public updateBook(book: Book) {
    book.editMode = false; // kai atsinaujima knyga, DOM'E editMode nustatomas i false
    return this.http.patch(`${this.URL}/${book.id}.json`, book);
    // siunciama PATCH uzklausa, atnaujanant knygos objekte esancius duomenys
  }
}
