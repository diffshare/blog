import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) {
  }

  getVolumes(query: string) {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + query + '&maxResults=40';
    return this.http.get(url);
  }
}
