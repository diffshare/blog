import {Component, HostListener, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ItemService} from '../item.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Observable<any[]>;
  currentItems: any[];

  constructor(private service: ItemService, private router: Router) {
    this.items = service.getItemsList();
    this.items.subscribe(items => {
      this.currentItems = items;
    });
  }

  ngOnInit() {
  }

  async navigateNext(id: string) {
    const index = this.currentItems.findIndex(value => value.id === id);
    const nextItem = this.currentItems[index + 1];
    if (nextItem != null) {
      await this.router.navigate(['items', nextItem.id]);
    }
  }

  async navigateBack(id: string) {
    const index = this.currentItems.findIndex(value => value.id === id);
    const nextItem = this.currentItems[index - 1];
    if (nextItem != null) {
      await this.router.navigate(['items', nextItem.id]);
    }
  }
}
