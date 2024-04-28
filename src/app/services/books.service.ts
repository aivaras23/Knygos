import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public fullBookInfo: Book[] = [];

  constructor(private http:HttpClient) { }

}
