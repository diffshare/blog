import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Observable<any[]>;

  constructor(private service: ItemService) {
    this.items = service.getItemsList();
  }

  ngOnInit() {
  }
}
