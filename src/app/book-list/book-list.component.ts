import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BookService]
})
export class BookListComponent implements OnInit {

  query: string;
  result: Observable<Object>;

  constructor(private service: BookService) {
  }

  ngOnInit() {
  }


  search() {
    this.result = this.service.getVolumes(this.query);
  }
}
