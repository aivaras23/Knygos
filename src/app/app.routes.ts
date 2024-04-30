import { Routes } from '@angular/router';
import { DisplayBooksComponent } from './components/display-books/display-books.component';
import { AddBookComponent } from './components/add-book/add-book.component';

export const routes: Routes = [
    {path:'addbook',component:AddBookComponent},
    {path:'displaybooks',component:DisplayBooksComponent},
    {path:'',component:AddBookComponent} // uzkrauti defaultini componenta
];
